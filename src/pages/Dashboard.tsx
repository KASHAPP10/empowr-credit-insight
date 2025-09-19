import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  DollarSign,
  CreditCard,
  Calendar,
  FileText
} from 'lucide-react';

// Sample data
const creditData = {
  blendedScore: 742,
  ficoScore: 720,
  empowrScore: 765,
  riskLevel: 'Low',
  lastUpdated: '2024-09-19',
  trends: {
    monthly: '+12',
    quarterly: '+28'
  }
};

const financialMetrics = [
  { label: 'Total Credit Limit', value: '$85,000', change: '+5%', trend: 'up' },
  { label: 'Credit Utilization', value: '22%', change: '-3%', trend: 'down' },
  { label: 'Payment History', value: '98%', change: '+1%', trend: 'up' },
  { label: 'Average Account Age', value: '7.2 years', change: '+2 months', trend: 'up' }
];

const recentActivity = [
  { date: '2024-09-15', action: 'Credit assessment completed', type: 'success' },
  { date: '2024-09-10', action: 'FICO score updated', type: 'info' },
  { date: '2024-09-05', action: 'New account added', type: 'info' },
  { date: '2024-09-01', action: 'Payment processed', type: 'success' }
];

export default function Dashboard() {
  const [scoreAnimation, setScoreAnimation] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScoreAnimation(creditData.blendedScore);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-success';
    if (score >= 700) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (score: number) => {
    if (score >= 750) return 'bg-success';
    if (score >= 700) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Credit Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Last updated: {new Date(creditData.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <Badge variant="outline" className="text-success border-success">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
              <Button size="sm" className="gradient-primary text-white">
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Credit Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Blended Score */}
          <Card className="lg:col-span-2 shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Blended Credit Score
              </CardTitle>
              <CardDescription>
                Combined FICO and Empowr proprietary scoring algorithm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(creditData.blendedScore)} animate-score-reveal shadow-score rounded-full w-32 h-32 flex items-center justify-center bg-muted/50 mx-auto mb-2`}>
                    {scoreAnimation}
                  </div>
                  <p className="text-sm text-muted-foreground">Blended Score</p>
                </div>
                
                <div className="flex-1 ml-8 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>FICO Score</span>
                      <span className="font-medium">{creditData.ficoScore}</span>
                    </div>
                    <Progress 
                      value={(creditData.ficoScore / 850) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Empowr Score</span>
                      <span className="font-medium">{creditData.empowrScore}</span>
                    </div>
                    <Progress 
                      value={(creditData.empowrScore / 850) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Monthly</p>
                      <p className="text-sm font-medium text-success">
                        {creditData.trends.monthly}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Quarterly</p>
                      <p className="text-sm font-medium text-success">
                        {creditData.trends.quarterly}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Risk Assessment: {creditData.riskLevel}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your blended score indicates excellent creditworthiness with low default risk.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                New Assessment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Trends
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {financialMetrics.map((metric, index) => (
            <Card key={index} className="shadow-card animate-slide-up">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-success" />
                      )}
                      <span className="text-xs text-success">{metric.change}</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 w-full lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="accounts">Credit Accounts</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Credit Analysis Summary</CardTitle>
                <CardDescription>
                  Comprehensive breakdown of your credit profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Positive Factors</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Excellent payment history (98% on-time)
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Low credit utilization ratio (22%)
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Diverse credit mix
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Areas to Monitor</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-warning" />
                        Consider reducing credit utilization below 10%
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-warning" />
                        Avoid opening new accounts soon
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates to your credit profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.type === 'success' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Payment History Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Payment history details would be displayed here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Credit Accounts Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Credit accounts breakdown would be displayed here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}