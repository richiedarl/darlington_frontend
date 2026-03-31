// src/types/index.ts
export interface FormData {
  name: string;
  email: string;
  phone?: string;
  service_type: string;
  message: string;
  budget?: string;
  created_at: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  start_date: string;
  timeline: string;
  budget: string;
  message: string;
  created_at: string;
}

export interface TutoringFormData {
  name: string;
  email: string;
  skill_level: string;
  course_interest: string;
  duration: string;
  created_at: string;
}

export interface Project {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}