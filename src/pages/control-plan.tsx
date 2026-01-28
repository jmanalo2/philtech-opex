import { Layout } from "@/components/Layout";
import { ControlPlanModule } from "@/components/modules/ControlPlanModule";
import { SEO } from "@/components/SEO";

export default function ControlPlanPage() {
  return (
    <Layout>
      <SEO title="Control Plan - Operational Excellence" />
      <ControlPlanModule />
    </Layout>
  );
}