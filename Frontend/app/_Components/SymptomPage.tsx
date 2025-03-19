"use client";
import React, { useState, useEffect, JSX } from "react";
import { Button } from "../../components/ui/button";
import { CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Slider } from "../../components/ui/slider";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  Calendar,
  Phone,
  AtSign,
  Thermometer,
  Clock,
  Activity,
  Zap,
  Heart,
  Pill,
  Shield,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [painLevel, setPainLevel] = useState([5]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [currentGradient, setCurrentGradient] = useState(0);

  const gradients = [
    "from-purple-600 to-pink-600",
    "from-blue-600 to-emerald-600",
    "from-violet-600 to-cyan-600",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [gradients.length]);

  const commonSymptoms = [
    { name: "Fever", icon: <Thermometer className="h-4 w-4" /> },
    { name: "Headache", icon: <Zap className="h-4 w-4" /> },
    { name: "Cough", icon: <Activity className="h-4 w-4" /> },
    { name: "Fatigue", icon: <AlertCircle className="h-4 w-4" /> },
    { name: "Muscle Pain", icon: <Activity className="h-4 w-4" /> },
    { name: "Shortness of Breath", icon: <Activity className="h-4 w-4" /> },
    { name: "Chest Pain", icon: <Heart className="h-4 w-4" /> },
    { name: "Nausea", icon: <Activity className="h-4 w-4" /> },
    { name: "Dizziness", icon: <Zap className="h-4 w-4" /> },
    { name: "Loss of Appetite", icon: <Activity className="h-4 w-4" /> },
    { name: "Abdominal Pain", icon: <Activity className="h-4 w-4" /> },
    { name: "Joint Pain", icon: <Activity className="h-4 w-4" /> },
    { name: "Rash", icon: <AlertCircle className="h-4 w-4" /> },
    { name: "Sore Throat", icon: <Activity className="h-4 w-4" /> },
    { name: "Runny Nose", icon: <Activity className="h-4 w-4" /> },
    { name: "Back Pain", icon: <Activity className="h-4 w-4" /> },
    { name: "Neck Pain", icon: <Activity className="h-4 w-4" /> },
    { name: "Anxiety", icon: <AlertCircle className="h-4 w-4" /> },
    { name: "Depression", icon: <AlertCircle className="h-4 w-4" /> },
    { name: "Insomnia", icon: <Activity className="h-4 w-4" /> },
    { name: "Diarrhea", icon: <Activity className="h-4 w-4" /> },
    { name: "Constipation", icon: <Activity className="h-4 w-4" /> },
    { name: "Vomiting", icon: <Activity className="h-4 w-4" /> },
    { name: "Sweating", icon: <Activity className="h-4 w-4" /> },
    { name: "Chills", icon: <Thermometer className="h-4 w-4" /> },
    { name: "Numbness", icon: <Activity className="h-4 w-4" /> },
    { name: "Tingling", icon: <Zap className="h-4 w-4" /> },
    { name: "Vision Problems", icon: <AlertCircle className="h-4 w-4" /> },
    { name: "Hearing Problems", icon: <AlertCircle className="h-4 w-4" /> },
    { name: "Memory Issues", icon: <AlertCircle className="h-4 w-4" /> },
  ];

  const preExistingConditions = [
    { name: "Diabetes", icon: <Activity className="h-4 w-4" /> },
    { name: "Hypertension", icon: <Activity className="h-4 w-4" /> },
    { name: "Asthma", icon: <Activity className="h-4 w-4" /> },
    { name: "Heart Disease", icon: <Heart className="h-4 w-4" /> },
    { name: "Arthritis", icon: <Activity className="h-4 w-4" /> },
    { name: "Cancer", icon: <AlertCircle className="h-4 w-4" /> },
    { name: "Thyroid Disorder", icon: <Activity className="h-4 w-4" /> },
    { name: "Kidney Disease", icon: <Activity className="h-4 w-4" /> },
    { name: "Liver Disease", icon: <Activity className="h-4 w-4" /> },
    { name: "Mental Health Condition", icon: <Activity className="h-4 w-4" /> },
    { name: "Autoimmune Disease", icon: <Shield className="h-4 w-4" /> },
    { name: "Chronic Pain", icon: <Activity className="h-4 w-4" /> },
    { name: "Migraine", icon: <Zap className="h-4 w-4" /> },
    { name: "Epilepsy", icon: <Activity className="h-4 w-4" /> },
    { name: "HIV/AIDS", icon: <Shield className="h-4 w-4" /> },
  ];

  const SymptomChip = ({ symptom, selected, onClick }: { symptom: { name: string; icon: JSX.Element }; selected: boolean; onClick: () => void }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "p-3 rounded-xl border-2 backdrop-blur-sm cursor-pointer",
        selected
          ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
          : "border-slate-200/50 hover:border-purple-300 dark:border-slate-700/50 dark:hover:border-purple-700",
        "transition-all duration-300 ease-out"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "p-2 rounded-lg",
            selected ? "bg-purple-500/20" : "bg-slate-100/50 dark:bg-slate-800"
          )}
        >
          {React.cloneElement(symptom.icon, {
            className: cn(
              "h-5 w-5",
              selected
                ? "text-purple-500"
                : "text-slate-600 dark:text-slate-300"
            ),
          })}
        </div>
        <span
          className={cn(
            "font-medium",
            selected && "text-purple-600 dark:text-purple-400"
          )}
        >
          {symptom.name}
        </span>
      </div>
    </motion.div>
  );

  const StepHeader = ({ number, title, description }: { number: number; title: string; description: string }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br backdrop-blur-lg"
    >
      <div className="absolute inset-0 bg-white/30 dark:bg-slate-900/50 backdrop-blur-sm" />
      <div className="relative z-10 flex items-center space-x-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg"
        >
          {number}
        </motion.div>
        <div>
          <motion.h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </motion.h2>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  const handleSubmit = () => {
    // Add your form submission logic here
    setFormSubmitted(true);
    setStep(4);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <User className="h-5 w-5 text-purple-500" />
                  Full Name
                </Label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-purple-300 dark:focus:border-purple-500 focus:ring-0 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Age
                </Label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-purple-300 dark:focus:border-purple-500 focus:ring-0 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <User className="h-5 w-5 text-purple-500" />
                  Gender
                </Label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <Select>
                    <SelectTrigger className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-purple-300 dark:focus:border-purple-500 focus:ring-0 transition-all">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Phone className="h-5 w-5 text-purple-500" />
                  Mobile Number
                </Label>
                <div className="flex space-x-2">
                  <div className="relative group flex-1">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter mobile number"
                      className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-purple-300 dark:focus:border-purple-500 focus:ring-0 transition-all"
                    />
                  </div>
                  <Button
                    onClick={() => setOtpSent(true)}
                    disabled={otpVerified}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple/30"
                  >
                    {otpVerified ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      "Verify"
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {otpSent && !otpVerified && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 p-4 rounded-xl bg-purple-50/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200/30 dark:border-purple-800/30"
                    >
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter OTP"
                          className="bg-white/70 dark:bg-slate-900/50 border-2 border-purple-100/50 dark:border-purple-800/50"
                        />
                        <Button
                          onClick={() => setOtpVerified(true)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple/30"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Verify OTP
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <AtSign className="h-5 w-5 text-purple-500" />
                Email Address (Optional)
              </Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-purple-300 dark:focus:border-purple-500 focus:ring-0 transition-all"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Thermometer className="h-5 w-5 text-purple-500" />
                Primary Symptoms
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonSymptoms.map((symptom) => (
                  <SymptomChip
                    key={symptom.name}
                    symptom={symptom}
                    selected={selectedSymptoms.includes(symptom.name)}
                    onClick={() => {
                      setSelectedSymptoms((prev) =>
                        prev.includes(symptom.name)
                          ? prev.filter((name) => name !== symptom.name)
                          : [...prev, symptom.name]
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Clock className="h-5 w-5 text-purple-500" />
                  Symptom Duration
                </Label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <Select>
                    <SelectTrigger className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-purple-300 dark:focus:border-purple-500 focus:ring-0 transition-all">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Activity className="h-5 w-5 text-purple-500" />
                  Pain Intensity (1-10)
                </Label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <Slider
                    value={painLevel}
                    onValueChange={setPainLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="cursor-pointer relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 rounded-full h-3"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <div
                      key={level}
                      className={`w-6 h-1 ${
                        painLevel[0] >= level
                          ? level <= 3
                            ? "bg-green-500"
                            : level <= 7
                            ? "bg-yellow-500"
                            : "bg-red-500"
                          : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span className="text-green-500 font-medium">Mild</span>
                  <span className="text-yellow-500 font-medium">Moderate</span>
                  <span className="text-red-500 font-medium">Severe</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Heart className="h-5 w-5 text-purple-500" />
                Pre-existing Conditions
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {preExistingConditions.map((condition) => (
                  <SymptomChip
                    key={condition.name}
                    symptom={condition}
                    selected={selectedConditions.includes(condition.name)}
                    onClick={() => {
                      setSelectedConditions((prev) =>
                        prev.includes(condition.name)
                          ? prev.filter((name) => name !== condition.name)
                          : [...prev, condition.name]
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Pill className="h-5 w-5 text-purple-500" />
                Ongoing Medications
              </Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <Textarea
                  id="medications"
                  placeholder="List your current medications..."
                  className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-700/50 focus:border-purple-300 dark:focus:border-purple-500 focus:ring-0 transition-all"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="h-24 w-24 text-purple-500 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Analysis Complete!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Your health assessment has been processed by our AI system. A
              detailed report and recommended next steps will be sent to your
              registered contact information.
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                setStep(1);
                setFormSubmitted(false);
              }}
            >
              Start New Assessment
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const ProgressBar = () => (
    <motion.div className="mb-8 space-y-4">
      <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
        <span>Step {step} of 3</span>
        <span>{Math.round((step / 3) * 100)}% Complete</span>
      </div>
      <div className="h-3 bg-slate-200/50 dark:bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          animate={{ width: `${(step / 3) * 100}%` }}
          className={cn(
            "h-full bg-gradient-to-r transition-all duration-1000 ease-out",
            gradients[currentGradient]
          )}
        />
      </div>
    </motion.div>
  );

  return (
    <div>
      {/* <div className="mb-10">
        <Navbar />
      </div> */}
      <div className=" min-h-screen bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-2"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            HealthGuard AI
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Intelligent Symptom Analysis & Medical Consultation
          </p>
        </motion.div> */}

          <ProgressBar />

          <motion.div
            layout
            className="relative backdrop-blur-xl rounded-3xl border-2 border-white/30 dark:border-slate-800/50 shadow-2xl"
            style={{
              background:
                "radial-gradient(at top left, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%)",
            }}
          >
            <CardContent className="p-8">
              {step <= 3 && (
                <StepHeader
                  number={step}
                  title={
                    step === 1
                      ? "Personal Information"
                      : step === 2
                      ? "Symptom Details"
                      : "Medical History"
                  }
                  description={
                    step === 1
                      ? "Please provide your basic details"
                      : step === 2
                      ? "Tell us about your symptoms"
                      : "Share your medical background"
                  }
                />
              )}
              {renderStepContent()}
            </CardContent>

            <div className="absolute inset-0 -z-10 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-purple-500/30 rounded-full"
                  style={{
                    width: Math.random() * 20 + 10,
                    height: Math.random() * 20 + 10,
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                  }}
                  animate={{
                    y: [0, 50, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {step < 4 && (
            <motion.div className="flex justify-between mt-8 gap-4">
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="group px-6 py-3 rounded-xl border-2 border-slate-200/50 hover:border-purple-300 dark:border-slate-700/50 dark:hover:border-purple-600 backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="mr-2 h-5 w-5 text-purple-500 group-hover:text-pink-500 transition-colors" />
                Previous
              </Button>

              <Button
                className={cn(
                  "px-8 py-3 rounded-xl bg-gradient-to-r shadow-lg hover:shadow-xl transition-all",
                  gradients[currentGradient],
                  "hover:scale-[1.02] transform-gpu"
                )}
                onClick={() => {
                  if (step === 3) {
                    handleSubmit();
                  } else {
                    setStep(step + 1);
                  }
                }}
                disabled={formSubmitted}
              >
                {step === 3 ? (
                  <>
                    Submit Analysis
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Next Step
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SymptomChecker;
