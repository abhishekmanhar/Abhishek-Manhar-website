import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, MapPin, Briefcase, DollarSign, Search, Filter, 
  CheckCircle, Sparkles, Send, ArrowRight
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Remote" | "Hybrid" | "Onsite";
  salary: string;
  category: "Engineering" | "Design" | "Management";
  color: string;
}

const JOBS_DATA: Job[] = [
  {
    id: "j1",
    title: "Senior React Architect",
    company: "Hexa Systems",
    location: "San Francisco, CA (Remote)",
    type: "Remote",
    salary: "$145k - $165k",
    category: "Engineering",
    color: "bg-indigo-600"
  },
  {
    id: "j2",
    title: "Lead Product Designer",
    company: "Aura Creative",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$130k - $150k",
    category: "Design",
    color: "bg-emerald-600"
  },
  {
    id: "j3",
    title: "Growth Program Manager",
    company: "Svelte Grid",
    location: "Seattle, WA",
    type: "Onsite",
    salary: "$110k - $130k",
    category: "Management",
    color: "bg-rose-600"
  },
  {
    id: "j4",
    title: "UI Developer (Design Systems)",
    company: "Swiss Labs",
    location: "Remote, India",
    type: "Remote",
    salary: "$120k - $140k",
    category: "Engineering",
    color: "bg-amber-600"
  }
];

export default function DiscoverJobsSandbox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleApply = (jobId: string, jobTitle: string) => {
    if (appliedJobIds.includes(jobId)) return;
    setAppliedJobIds((prev) => [...prev, jobId]);
    setNotification(`Successfully submitted your application for ${jobTitle}!`);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none my-8 px-2 sm:px-4" id="discoverjobs-interactive-sandbox">
      {/* Introduction text */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">
          Discover.Jobs — Interactive Preview
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-primary mt-3">
          Modern Job Directory Board
        </h3>
        <p className="font-sans text-xs sm:text-sm text-muted-text mt-2">
          Experience our fluid real-time query parameters. Filter vacancies by engineering/design roles, execute instant typing queries, and optimize mobile responsive layouts.
        </p>
      </div>

      {/* Main Sandbox Box */}
      <div className="w-full max-w-4xl mx-auto bg-white border border-border-custom shadow-md rounded-2xl overflow-hidden flex flex-col select-none">
        
        {/* Simple Search & Filter Header with high contrast */}
        <div className="bg-[#F8F7F3] border-b border-border-custom p-4 flex flex-col gap-3">
          
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Search inputs */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 text-neutral-400" size={15} />
              <input
                type="text"
                placeholder="Search jobs, titles, or active keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#D8D4CC] rounded-lg text-xs text-primary font-sans focus:outline-none focus:border-accent"
              />
            </div>
            
            {/* Categories filters */}
            <div className="flex flex-wrap gap-1.5 min-w-fit items-center">
              {["All", "Engineering", "Design", "Management"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] sm:text-xs font-sans font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? "bg-accent text-white border-accent" 
                      : "bg-white border-[#D8D4CC] text-primary hover:bg-neutral-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Global Toast Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-50 border-b border-emerald-100 px-4 py-2.5 flex items-center gap-2 text-emerald-800 text-[11px] font-sans font-bold"
            >
              <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 animate-bounce" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Jobs List */}
        <div className="p-4 sm:p-5 flex flex-col gap-3 min-h-[220px]">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const applied = appliedJobIds.includes(job.id);
              return (
                <div
                  key={job.id}
                  className="bg-[#FAF9F5] hover:bg-white border border-[#EDEAE3] hover:border-accent/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    {/* Visual icon badge */}
                    <div className={`w-10 h-10 rounded-xl ${job.color} flex items-center justify-center text-white font-mono font-bold text-sm shadow-xs`}>
                      {job.title[0]}
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-primary tracking-tight">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1 text-[11px] text-muted-text font-sans">
                        <span className="flex items-center gap-1 font-semibold text-neutral-800">
                          <Building2 size={11} /> {job.company}
                        </span>
                        <span className="text-neutral-300">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {job.location}
                        </span>
                        <span className="text-neutral-300">•</span>
                        <span className="flex items-center gap-1 text-accent font-semibold">
                          <DollarSign size={11} className="inline" /> {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3.5 sm:pt-0 mt-2 sm:mt-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider bg-neutral-200/55 px-2.5 py-0.5 rounded-full text-neutral-600 font-bold">
                      {job.type}
                    </span>
                    <button
                      onClick={() => handleApply(job.id, job.title)}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                        applied 
                          ? "bg-neutral-200/70 text-neutral-500 cursor-default border border-neutral-300" 
                          : "bg-primary text-white hover:bg-accent hover:scale-[1.02]"
                      }`}
                    >
                      {applied ? (
                        <>
                          <CheckCircle size={12} />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <span>Apply</span>
                          <ArrowRight size={11} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-neutral-400 gap-2">
              <span className="text-sm font-sans">No matching jobs located in database passes.</span>
              <button 
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                className="text-xs text-accent font-bold font-mono hover:underline cursor-pointer"
              >
                CLEAR ACTIVE SEARCH QUERY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
