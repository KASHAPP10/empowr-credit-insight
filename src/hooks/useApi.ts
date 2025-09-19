import { useState } from 'react';

// Types for API responses
export interface CreditScore {
  blendedScore: number;
  ficoScore: number;
  empowrScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastUpdated: string;
}

export interface CreditAssessmentData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    socialSecurityNumber: string;
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  employment: {
    status: string;
    employer: string;
    jobTitle: string;
    annualIncome: number;
    employmentLength: string;
  };
  financial: {
    monthlyRent: number;
    monthlyDebt: number;
    bankingRelationship: string;
    existingCredit: string;
  };
}

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Custom hook for credit score fetching
export function useCreditScore() {
  const [response, setResponse] = useState<ApiResponse<CreditScore>>({
    data: null,
    loading: false,
    error: null
  });

  const fetchCreditScore = async (userId: string) => {
    setResponse({ data: null, loading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - in real app, this would come from your backend
      const mockData: CreditScore = {
        blendedScore: 742,
        ficoScore: 720,
        empowrScore: 765,
        riskLevel: 'Low',
        lastUpdated: new Date().toISOString()
      };

      setResponse({ data: mockData, loading: false, error: null });
    } catch (error) {
      setResponse({ 
        data: null, 
        loading: false, 
        error: 'Failed to fetch credit score' 
      });
    }
  };

  return { ...response, fetchCreditScore };
}

// Custom hook for credit assessment submission
export function useCreditAssessment() {
  const [response, setResponse] = useState<ApiResponse<CreditScore>>({
    data: null,
    loading: false,
    error: null
  });

  const submitAssessment = async (assessmentData: CreditAssessmentData) => {
    setResponse({ data: null, loading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock credit score calculation based on assessment data
      const baseScore = 600;
      const incomeBonus = Math.min(assessmentData.employment.annualIncome / 1000, 100);
      const debtPenalty = assessmentData.financial.monthlyDebt / 10;
      
      const calculatedFico = Math.min(850, Math.max(300, baseScore + incomeBonus - debtPenalty));
      const calculatedEmpowr = Math.min(850, calculatedFico + Math.random() * 50 - 25);
      const blended = Math.round((calculatedFico * 0.6) + (calculatedEmpowr * 0.4));

      const mockResult: CreditScore = {
        blendedScore: blended,
        ficoScore: Math.round(calculatedFico),
        empowrScore: Math.round(calculatedEmpowr),
        riskLevel: blended >= 750 ? 'Low' : blended >= 650 ? 'Medium' : 'High',
        lastUpdated: new Date().toISOString()
      };

      setResponse({ data: mockResult, loading: false, error: null });
      
      // Store result in localStorage for demo purposes
      localStorage.setItem('creditScore', JSON.stringify(mockResult));
      
      return mockResult;
    } catch (error) {
      setResponse({ 
        data: null, 
        loading: false, 
        error: 'Failed to process credit assessment' 
      });
      throw error;
    }
  };

  return { ...response, submitAssessment };
}

// Custom hook for authentication
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In demo, accept any credentials
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
    return true;
  };

  const register = async (userData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', userData.email);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('creditScore');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, register, logout };
}

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Utility function to format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};