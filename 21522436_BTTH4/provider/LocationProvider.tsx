import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { supabase } from "@/supabase/supabase";
import { useAuth } from "./AuthProvider";
import { NEXTJS_SERVER } from "@/lib/constants";

type TPermissionStatus = "pending" | "granted" | "denied";

const LocationContext = createContext<{
  location: [number, number] | null;
  permissionStatus: TPermissionStatus;
  checking: () => Promise<void>;
}>({} as any);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<TPermissionStatus>("pending");
  const checking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const { coords } = await Location.getCurrentPositionAsync({});
      const coordinates = [coords.latitude, coords.longitude] as [number, number];
      setLocation(coordinates);
      setPermissionStatus("granted");
      if (!session) return;
      // const payload = await getRelativeLocation(coordinates);
      const location = await fetch(`${NEXTJS_SERVER}/api/common/location?lat=${coordinates[0]}&long=${coordinates[1]}`)
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((payload) => {
          return payload.data;
        })
        .catch((err) => {
          console.log(err);
        });
      const { display_name } = location;
      await supabase.from("locations").upsert({
        coordinates,
        display_address: display_name,
        user_id: session.user.id,
      }, { onConflict: "user_id" });
    } else {
      setPermissionStatus("denied");
    }
  };

  useEffect(() => {
    checking();
  }, []);

  return (
    <LocationContext.Provider value={{ location, permissionStatus, checking }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
