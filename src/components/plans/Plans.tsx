import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentPlan from "./StudentPlan";
import ClinicianPlan from "./ClinicianPlan";

interface IPlanProps {
  successUrl: string;
  cancelUrl: string;
}

export default function Plans({ successUrl, cancelUrl }: IPlanProps) {
  return (
    <Tabs
      defaultValue="monthly"
      className="flex flex-col space-y-8 items-center"
    >
      {/* Monthly/Annual switcher */}
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="annually">Annually</TabsTrigger>
      </TabsList>
      {/* Plans */}
      <TabsContent
        value="monthly"
        className="flex items-center flex-wrap gap-6 mt-0"
      >
        <StudentPlan
          price={42.99}
          interval="month"
          successUrl={successUrl}
          cancelUrl={cancelUrl}
        />
        <ClinicianPlan
          price={57.99}
          interval="month"
          successUrl={successUrl}
          cancelUrl={cancelUrl}
        />
      </TabsContent>
      <TabsContent
        value="annually"
        className="flex items-center flex-wrap gap-6 mt-0"
      >
        <StudentPlan
          price={429.99}
          interval="year"
          offer="2 months free"
          successUrl={successUrl}
          cancelUrl={cancelUrl}
        />
        <ClinicianPlan
          price={579.99}
          interval="year"
          offer="2 months free"
          successUrl={successUrl}
          cancelUrl={cancelUrl}
        />
      </TabsContent>
    </Tabs>
  );
}
