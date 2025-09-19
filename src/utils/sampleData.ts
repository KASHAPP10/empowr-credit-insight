// Sample data for testing and development

export const sampleCreditData = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: '2022-01-15',
  },
  creditScore: {
    blendedScore: 742,
    ficoScore: 720,
    empowrScore: 765,
    riskLevel: 'Low' as const,
    lastUpdated: '2024-09-19',
    trends: {
      monthly: '+12',
      quarterly: '+28',
      yearly: '+45'
    }
  },
  financialMetrics: [
    { 
      label: 'Total Credit Limit', 
      value: '$85,000', 
      numericValue: 85000,
      change: '+5%', 
      trend: 'up' as const 
    },
    { 
      label: 'Credit Utilization', 
      value: '22%', 
      numericValue: 22,
      change: '-3%', 
      trend: 'down' as const 
    },
    { 
      label: 'Payment History', 
      value: '98%', 
      numericValue: 98,
      change: '+1%', 
      trend: 'up' as const 
    },
    { 
      label: 'Average Account Age', 
      value: '7.2 years', 
      numericValue: 7.2,
      change: '+2 months', 
      trend: 'up' as const 
    }
  ],
  creditAccounts: [
    {
      id: 1,
      type: 'Credit Card',
      issuer: 'Chase Sapphire Preferred',
      balance: 2450,
      limit: 15000,
      utilization: 16.3,
      paymentStatus: 'Current',
      openedDate: '2019-03-15'
    },
    {
      id: 2,
      type: 'Credit Card',
      issuer: 'American Express Gold',
      balance: 890,
      limit: 25000,
      utilization: 3.6,
      paymentStatus: 'Current',
      openedDate: '2020-07-22'
    },
    {
      id: 3,
      type: 'Auto Loan',
      issuer: 'Bank of America',
      balance: 18500,
      limit: 35000,
      utilization: 52.9,
      paymentStatus: 'Current',
      openedDate: '2022-01-10'
    },
    {
      id: 4,
      type: 'Mortgage',
      issuer: 'Wells Fargo',
      balance: 245000,
      limit: 320000,
      utilization: 76.6,
      paymentStatus: 'Current',
      openedDate: '2021-06-01'
    }
  ],
  paymentHistory: [
    { month: 'Sep 2024', onTime: true, amount: 2500 },
    { month: 'Aug 2024', onTime: true, amount: 2500 },
    { month: 'Jul 2024', onTime: true, amount: 2500 },
    { month: 'Jun 2024', onTime: true, amount: 2500 },
    { month: 'May 2024', onTime: false, amount: 2500 },
    { month: 'Apr 2024', onTime: true, amount: 2500 },
    { month: 'Mar 2024', onTime: true, amount: 2500 },
    { month: 'Feb 2024', onTime: true, amount: 2500 },
    { month: 'Jan 2024', onTime: true, amount: 2500 },
    { month: 'Dec 2023', onTime: true, amount: 2500 },
    { month: 'Nov 2023', onTime: true, amount: 2500 },
    { month: 'Oct 2023', onTime: true, amount: 2500 }
  ],
  recentActivity: [
    { 
      date: '2024-09-15', 
      action: 'Credit assessment completed', 
      type: 'success' as const,
      description: 'New comprehensive credit assessment generated'
    },
    { 
      date: '2024-09-10', 
      action: 'FICO score updated', 
      type: 'info' as const,
      description: 'Monthly FICO score refresh from Experian'
    },
    { 
      date: '2024-09-05', 
      action: 'New account added', 
      type: 'info' as const,
      description: 'Chase Sapphire Reserve account detected'
    },
    { 
      date: '2024-09-01', 
      action: 'Payment processed', 
      type: 'success' as const,
      description: 'Monthly payment of $2,500 processed successfully'
    },
    { 
      date: '2024-08-28', 
      action: 'Credit limit increase', 
      type: 'success' as const,
      description: 'American Express increased credit limit by $5,000'
    }
  ],
  riskFactors: {
    positive: [
      'Excellent payment history (98% on-time)',
      'Low credit utilization ratio (22%)',
      'Diverse credit mix with multiple account types',
      'Long average account age (7.2 years)',
      'No recent hard inquiries'
    ],
    cautions: [
      'Consider reducing credit utilization below 10%',
      'Avoid opening new accounts in the next 6 months',
      'Monitor for any changes in payment patterns'
    ]
  }
};

export const industryBenchmarks = {
  creditUtilization: {
    excellent: 10,
    good: 30,
    fair: 50,
    poor: 100
  },
  paymentHistory: {
    excellent: 100,
    good: 95,
    fair: 85,
    poor: 75
  },
  averageAccountAge: {
    excellent: 10,
    good: 7,
    fair: 4,
    poor: 2
  }
};

export const mockApiResponses = {
  login: {
    success: true,
    message: 'Login successful',
    token: 'mock-jwt-token-12345',
    user: {
      id: 1,
      email: 'demo@empowrcredit.com',
      firstName: 'Demo',
      lastName: 'User',
      role: 'lender'
    }
  },
  creditAssessment: {
    success: true,
    message: 'Assessment completed successfully',
    assessmentId: 'ASSESS-2024-09-19-001',
    processingTime: '2.3 seconds',
    confidence: 97.8
  }
};