import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  DollarSign, 
  Home, 
  CreditCard,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssessmentFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  socialSecurityNumber: string;
  phone: string;
  email: string;
  
  // Address Information
  street: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Employment Information
  employmentStatus: string;
  employer: string;
  jobTitle: string;
  annualIncome: string;
  employmentLength: string;
  
  // Financial Information
  monthlyRent: string;
  monthlyDebt: string;
  bankingRelationship: string;
  existingCredit: string;
}

const steps = [
  { id: 1, title: 'Personal Info', icon: User, description: 'Basic personal details' },
  { id: 2, title: 'Address', icon: Home, description: 'Current residence information' },
  { id: 3, title: 'Employment', icon: DollarSign, description: 'Employment and income details' },
  { id: 4, title: 'Financial', icon: CreditCard, description: 'Financial obligations and assets' },
  { id: 5, title: 'Review', icon: FileText, description: 'Review and submit' }
];

export default function CreditAssessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<AssessmentFormData>();

  const watchedValues = watch();

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: AssessmentFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Assessment Complete!",
        description: "Your credit assessment has been processed successfully.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Assessment Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register('firstName', { required: 'First name is required' })}
                />
                {errors.firstName && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.firstName.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register('lastName', { required: 'Last name is required' })}
                />
                {errors.lastName && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.lastName.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth', { required: 'Date of birth is required' })}
              />
              {errors.dateOfBirth && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">
                    {errors.dateOfBirth.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialSecurityNumber">Social Security Number *</Label>
              <Input
                id="socialSecurityNumber"
                placeholder="XXX-XX-XXXX"
                maxLength={11}
                {...register('socialSecurityNumber', { 
                  required: 'SSN is required',
                  pattern: {
                    value: /^\d{3}-?\d{2}-?\d{4}$/,
                    message: 'Please enter a valid SSN format'
                  }
                })}
              />
              {errors.socialSecurityNumber && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">
                    {errors.socialSecurityNumber.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.phone.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.email.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                placeholder="123 Main Street"
                {...register('street', { required: 'Street address is required' })}
              />
              {errors.street && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">
                    {errors.street.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.city.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => setValue('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.state.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  placeholder="10001"
                  maxLength={5}
                  {...register('zipCode', { 
                    required: 'ZIP code is required',
                    pattern: {
                      value: /^\d{5}$/,
                      message: 'Please enter a valid 5-digit ZIP code'
                    }
                  })}
                />
                {errors.zipCode && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.zipCode.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status *</Label>
              <Select onValueChange={(value) => setValue('employmentStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed Full-Time</SelectItem>
                  <SelectItem value="parttime">Employed Part-Time</SelectItem>
                  <SelectItem value="selfemployed">Self-Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employer">Employer</Label>
                <Input
                  id="employer"
                  placeholder="Company Name"
                  {...register('employer')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Software Engineer"
                  {...register('jobTitle')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income *</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  placeholder="75000"
                  {...register('annualIncome', { required: 'Annual income is required' })}
                />
                {errors.annualIncome && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.annualIncome.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employmentLength">Employment Length</Label>
                <Select onValueChange={(value) => setValue('employmentLength', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5plus">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent/Mortgage</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  placeholder="1500"
                  {...register('monthlyRent')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monthlyDebt">Monthly Debt Payments</Label>
                <Input
                  id="monthlyDebt"
                  type="number"
                  placeholder="500"
                  {...register('monthlyDebt')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankingRelationship">Banking Relationship</Label>
              <Select onValueChange={(value) => setValue('bankingRelationship', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select banking relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking Account Only</SelectItem>
                  <SelectItem value="savings">Savings Account Only</SelectItem>
                  <SelectItem value="both">Checking & Savings</SelectItem>
                  <SelectItem value="none">No Banking Relationship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="existingCredit">Existing Credit Experience</Label>
              <Select onValueChange={(value) => setValue('existingCredit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select credit experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (750+)</SelectItem>
                  <SelectItem value="good">Good (700-749)</SelectItem>
                  <SelectItem value="fair">Fair (650-699)</SelectItem>
                  <SelectItem value="poor">Poor (Below 650)</SelectItem>
                  <SelectItem value="none">No Credit History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground">Review Your Information</h3>
              <p className="text-muted-foreground">Please verify all details before submitting</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {watchedValues.firstName} {watchedValues.lastName}</p>
                  <p><strong>DOB:</strong> {watchedValues.dateOfBirth}</p>
                  <p><strong>Phone:</strong> {watchedValues.phone}</p>
                  <p><strong>Email:</strong> {watchedValues.email}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Street:</strong> {watchedValues.street}</p>
                  <p><strong>City:</strong> {watchedValues.city}</p>
                  <p><strong>State:</strong> {watchedValues.state}</p>
                  <p><strong>ZIP:</strong> {watchedValues.zipCode}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Employment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Status:</strong> {watchedValues.employmentStatus}</p>
                  <p><strong>Employer:</strong> {watchedValues.employer}</p>
                  <p><strong>Title:</strong> {watchedValues.jobTitle}</p>
                  <p><strong>Income:</strong> ${watchedValues.annualIncome}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Financial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Housing:</strong> ${watchedValues.monthlyRent}/month</p>
                  <p><strong>Debt:</strong> ${watchedValues.monthlyDebt}/month</p>
                  <p><strong>Banking:</strong> {watchedValues.bankingRelationship}</p>
                  <p><strong>Credit:</strong> {watchedValues.existingCredit}</p>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <AlertDescription>
                By submitting this assessment, you consent to a credit check and agree to our Terms of Service and Privacy Policy.
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Credit Assessment</h1>
          <p className="text-muted-foreground">Complete your credit assessment in {steps.length} easy steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                {step.id < steps.length && (
                  <div className={`h-1 w-16 mx-2 hidden sm:block ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const currentStepData = steps.find(s => s.id === currentStep);
                const IconComponent = currentStepData?.icon;
                return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
              })()}
              Step {currentStep}: {steps.find(s => s.id === currentStep)?.title}
            </CardTitle>
            <CardDescription>
              {steps.find(s => s.id === currentStep)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 mt-6 border-t border-border">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="gradient-primary text-white flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="gradient-primary text-white flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Assessment
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}