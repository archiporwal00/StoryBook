
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { ToastManager } from '@/components/feedback/Toast';
import { Heading, Paragraph, Label, HelperText } from '@/components/typography';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert } from '@/components/feedback/Alert';

const Index = () => {
  const toast = useToast('bottom-right');

  const handleShowToast = () => {
    toast.addToast({
      title: 'Success!',
      description: 'Your action was completed successfully',
      variant: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header Section */}
      <header className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <Heading as="h1" className="text-foreground">
            Design System
          </Heading>
          <ThemeSwitcher />
        </div>
        <Alert variant="info">
          Welcome to our enterprise design system showcasing various components
        </Alert>
      </header>

      {/* Typography Section */}
      <section className="mb-12">
        <Heading as="h2" className="mb-6">Typography</Heading>
        
        <div className="space-y-6">
          <div>
            <Heading as="h1">Heading 1</Heading>
            <Heading as="h2">Heading 2</Heading>
            <Heading as="h3">Heading 3</Heading>
          </div>

          <div>
            <Paragraph>
              This is a standard paragraph with regular text. It demonstrates our base
              typography styles with proper spacing and line height.
            </Paragraph>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sample-input" required>Form Label</Label>
            <HelperText>This is a helper text example</HelperText>
            <HelperText variant="error">This is an error message</HelperText>
          </div>
        </div>
      </section>

      {/* Interactive Components Section */}
      <section className="mb-12">
        <Heading as="h2" className="mb-6">Interactive Components</Heading>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleShowToast}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Show Toast
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </div>
      </section>

      {/* Toast Manager */}
      <ToastManager 
        position={toast.position} 
        toasts={toast.toasts} 
        onClose={toast.removeToast} 
      />
    </div>
  );
};

export default Index;
