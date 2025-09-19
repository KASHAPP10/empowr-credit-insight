import { Card, CardContent } from '@/components/ui/card';
import { Shield, BarChart3, Clock, Target, Database, Zap } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Blended Credit Score',
    description: 'Combines traditional FICO scores with our proprietary Empowr algorithm for comprehensive assessment.'
  },
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'Enterprise-level encryption and security protocols protect sensitive financial data.'
  },
  {
    icon: Clock,
    title: 'Real-Time Analysis',
    description: 'Instant credit assessment with live data processing and immediate results.'
  },
  {
    icon: Target,
    title: 'Precision Scoring',
    description: '99.9% accuracy with advanced machine learning algorithms for reliable predictions.'
  },
  {
    icon: Database,
    title: 'Comprehensive Data',
    description: 'Access to multiple credit bureaus and alternative data sources for complete insights.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Complete assessment in under 60 seconds with optimized processing pipelines.'
  }
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Empowr Credit?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced technology meets financial expertise to deliver the most accurate 
            and comprehensive credit assessment platform available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}