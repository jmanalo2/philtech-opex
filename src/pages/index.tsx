import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Factory,
  TrendingUp,
  Target,
  Shield,
  GitBranch,
  Users,
  Award,
  BarChart3,
  Search,
  Workflow,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList } from
"lucide-react";

const features = [
{
  icon: BarChart3,
  title: "Data-Driven Decisions",
  description: "Track metrics and KPIs with real-time visualization and analytics",
  color: "from-blue-500 to-cyan-500"
},
{
  icon: TrendingUp,
  title: "Continuous Improvement",
  description: "Implement systematic improvements with proven methodologies",
  color: "from-purple-500 to-pink-500"
},
{
  icon: Shield,
  title: "Quality Assurance",
  description: "Maintain high standards with root cause analysis and process mapping",
  color: "from-orange-500 to-red-500"
}];


const modules = [
{
  name: "SIPOC",
  href: "/sipoc",
  icon: Workflow,
  description: "Define process boundaries with Supplier-Input-Process-Output-Customer mapping",
  color: "bg-gradient-to-br from-slate-600 to-slate-700"
},
{
  name: "Process Map",
  href: "/process-map",
  icon: GitBranch,
  description: "Visualize and optimize your workflow with detailed process mapping",
  color: "bg-gradient-to-br from-blue-600 to-indigo-600"
},
{
  name: "Metrics",
  href: "/metrics",
  icon: BarChart3,
  description: "Monitor performance indicators with interactive charts and dashboards",
  color: "bg-gradient-to-br from-orange-600 to-amber-600"
},
{
  name: "Root Cause",
  href: "/root-cause",
  icon: Search,
  description: "Identify and solve problems using 5 Whys, Fishbone, and Pareto analysis",
  color: "bg-gradient-to-br from-red-600 to-rose-600"
},
{
  name: "Improvements",
  href: "/improvements",
  icon: TrendingUp,
  description: "Track and manage improvement initiatives with IdeaHub integration",
  color: "bg-gradient-to-br from-cyan-600 to-teal-600"
},
{
  name: "Attendance",
  href: "/attendance",
  icon: Users,
  description: "Track team presence and availability for better resource planning",
  color: "bg-gradient-to-br from-purple-600 to-pink-600"
},
{
  name: "Skills Matrix",
  href: "/skills-matrix",
  icon: Award,
  description: "Map team competencies from basic knowledge to expert level",
  color: "bg-gradient-to-br from-green-600 to-emerald-600"
},
{
  name: "Control Plan",
  href: "/control-plan",
  icon: ClipboardList,
  description: "Standardize product and process control methods",
  color: "bg-gradient-to-br from-indigo-600 to-violet-600"
}];


const stats = [
{ label: "Modules", value: "8" },
{ label: "Processes", value: "∞" },
{ label: "Analysis Tools", value: "4" }];


export default function Home() {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 -z-10">

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-full blur-3xl" />

          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

        </motion.div>

        {[...Array(5)].map((_, i) =>
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4
          }}
          className="absolute w-2 h-2 bg-blue-500 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 10}%`
          }} />

        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative" style={{ backgroundColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(122, 139, 203, 0) 24%, #f5f5f5 100%)" }}>

          <div className="mb-12 text-center" style={{ backgroundColor: "transparent", backgroundImage: "linear-gradient(90deg, #1d4ed8 0%, #0369a1 100%)" }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg">

              <Factory className="w-5 h-5" />
              <span className="font-semibold">Philtech Operational Excellence</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}>

                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent" style={{ color: "#ffffff", backgroundImage: "linear-gradient(90deg, #d6d3d1 0%, rgb(30, 58, 138) 50%, rgb(49, 46, 129) 100%)" }}>

              Drive Excellence
              <br />
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ backgroundColor: "#ffffff", backgroundImage: "none" }}>

                Through Data
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto" style={{ color: "#bababa" }}>

              Comprehensive platform for process optimization, quality management, and
              continuous improvement initiatives
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/sipoc">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/metrics">
                  <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950" style={{ color: "#f3f4f6", backgroundColor: "#3b82f6", boxShadow: "none", backgroundImage: "none" }}>
                    View Metrics
                    <BarChart3 className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-16">

            {features.map((feature, index) =>
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}>

                <Card className="border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16">

            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold border-blue-600 text-blue-600">
                Available Modules
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Seven powerful modules working together to transform your operations
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {modules.map((module, index) =>
              <motion.div
                key={module.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}>

                  <Link href={module.href}>
                    <Card className="h-full cursor-pointer border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm hover:shadow-xl">
                      <CardHeader>
                        <div className={`w-14 h-14 rounded-xl ${module.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <module.icon className="w-7 h-7 text-white" />
                        </div>
                        <CardTitle className="text-lg flex items-center justify-between">
                          {module.name}
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {module.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center">

            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 border-0 text-white">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold mb-8">Platform Statistics</h2>
                <div className="grid grid-cols-3 gap-8">
                  {stats.map((stat, index) =>
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.1
                    }}>

                      <div className="text-5xl font-bold mb-2">{stat.value}</div>
                      <div className="text-blue-100">{stat.label}</div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>);

}