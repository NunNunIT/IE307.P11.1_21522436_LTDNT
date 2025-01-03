import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "~/supabase/supabase";
import { useAuth } from "./AuthProvider";
import { Alert } from "react-native";

type CartCountContextType = {
  cartCount: number;
  addCart: (productId: any, quantity: number) => Promise<void>;
  removeItem: (productId: any) => Promise<void>;
};

const CartCountContext = createContext<CartCountContextType | undefined>(
  undefined
);

export function CartCountProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const { session } = useAuth();

  const fetchCartCount = async () => {
    if (!session?.user?.id) return;
    const { count } = await supabase
      .from("cart")
      .select("*", { count: "exact" })
      .eq("user_id", session.user.id);
    setCartCount(count || 0);
  };

  const fetchCartItems = async () => {
    await fetchCartCount();
  };

  useEffect(() => {
    fetchCartCount();

    const channel = supabase
      .channel("cart_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart" },
        fetchCartCount
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [session?.user?.id]);

  const addCart = async (productId: any, quantity: number, price: any) => {
    try {
      if (!session?.user?.id) {
        Alert.alert(
          "Thông báo",
          "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng."
        );
        return;
      }

      const { data: existingCartItem, error: fetchError } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("product_id", productId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching cart item:", fetchError.message);
        return;
      }

      if (existingCartItem) {
        Alert.alert(
          "Đã có trong giỏ hàng",
          "Sản phẩm này đã có trong giỏ hàng."
        );
        return;
      }

      const { error: insertError } = await supabase.from("cart").insert([
        {
          user_id: session.user.id,
          product_id: productId,
          quantity: 1,
          price: price,
        },
      ]);

      if (insertError) {
        console.error("Error adding to cart:", insertError.message);
        Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng.");
        return;
      }

      await fetchCartCount();
      Alert.alert(
        "Thêm giỏ hàng thành công",
        "Sản phẩm đã được thêm vào giỏ hàng."
      );
    } catch (error) {
      console.error("Error in addCart:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  const removeItem = useCallback(async (productId: number) => {
    try {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("id", productId);
      if (error) throw error;
      await fetchCartCount();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }, []);

  return (
    <CartCountContext.Provider value={{ cartCount, addCart, removeItem }}>
      {children}
    </CartCountContext.Provider>
  );
}

export function useCartCount() {
  const context = useContext(CartCountContext);
  if (!context) {
    throw new Error("useCartCount must be used within CartCountProvider");
  }
  return context;
}
