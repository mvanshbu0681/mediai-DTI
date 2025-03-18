'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import {
  Brain,
  Video,
  MessageSquare,
  Clock,
  Shield,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI Diagnosis",
      description:
        "Get instant AI-powered medical suggestions based on your symptoms with high accuracy and personalized treatment recommendations.",
    },
    {
      icon: <Video className="h-8 w-8 text-green-600" />,
      title: "Video Consultations",
      description:
        "Connect with qualified doctors through high-quality video calls anytime, anywhere, without leaving the comfort of your home.",
      route: "/VideoConsulatationPage",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "24/7 Support",
      description:
        "Access medical support anytime through our advanced chat system with real-time responses from our AI and medical professionals.",
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Quick Prescriptions",
      description:
        "Receive electronic prescriptions quickly after your consultations, with direct delivery options to your preferred pharmacy.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Secure Health Records",
      description:
        "Your medical data is protected with enterprise-grade encryption and complies with all healthcare privacy regulations.",
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Health Tracking",
      description:
        "Monitor your health metrics over time with intuitive dashboards and receive personalized insights for better wellbeing.",
    },
  ];

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-green-500/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30"
          >
            <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">
              Cutting-Edge Technology
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Advanced Healthcare Features
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto text-lg">
            Experience healthcare reimagined with our innovative features
            designed for your convenience and wellbeing
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 h-full">
                <CardContent className="p-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center text-center h-full"
                  >
                    <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 shadow-md shadow-blue-500/10">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      {feature.description}
                    </p>
                    {feature.route && (
                      <Link href={feature.route}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-auto px-5 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition shadow-md shadow-blue-500/20 font-medium"
                        >
                          Start Consultation
                        </motion.button>
                      </Link>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600/90 to-green-600/90 text-white text-center shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to experience the future of healthcare?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their
            healthcare experience with MediAI.
          </p>
          <Link href={'/GetstartedPage'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow-md hover:bg-slate-100 transition"
            >
              Get Started Today
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
