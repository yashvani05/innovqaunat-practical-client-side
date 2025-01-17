import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import AdminRegistration from "./AdminRegistration";
import CustomerRegistration from "./CustomerRegistration";

const Registration = () => {
  const [selectedRole, setSelectedRole] = useState("customer"); // Set initial role to customer

  const handleTabChange = (value) => {
    console.log("value--", value);

    setSelectedRole(value);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-800 p-5">
      <div className="w-full max-w-2xl bg-white p-6 rounded-[20px] shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <Tabs
          defaultValue="customer"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="flex justify-around h-auto">
            <TabsTrigger
              value="customer"
              className="w-1/2 text-center truncate overflow-hidden sm:w-auto sm:max-w-xs text-wrap"
            >
              Customer Registration
            </TabsTrigger>

            <TabsTrigger
              value="admin"
              className="w-1/2 text-center truncate overflow-hidden sm:w-auto sm:max-w-xs text-wrap"
            >
              Admin Registration
            </TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <CustomerRegistration role={selectedRole} />
          </TabsContent>
          <TabsContent value="admin">
            <AdminRegistration role={selectedRole} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Registration;
