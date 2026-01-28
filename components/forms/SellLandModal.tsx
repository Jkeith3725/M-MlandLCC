'use client';

import { useState, FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { ALL_COUNTIES, STATES } from '@/lib/constants';
import { SellLandFormData } from '@/lib/types';
import { submitSellLandForm } from '@/lib/formSubmission';
import { trackLead } from '@/lib/analytics';

interface SellLandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SellLandModal({ isOpen, onClose }: SellLandModalProps) {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SellLandFormData>({
    name: '',
    email: '',
    phone: '',
    county: undefined,
    state: undefined,
    acreage: undefined,
    askingPrice: undefined,
    timeline: undefined,
    message: undefined,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Google Sheets via Google Apps Script
      const result = await submitSellLandForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
        county: formData.county,
        acreage: formData.acreage,
        askingPrice: formData.askingPrice,
        timeline: formData.timeline,
        message: formData.message,
      });

      if (result.success) {
        // Track Lead event with Meta Pixel
        const [firstName, ...lastNameParts] = formData.name.split(' ');
        const lastName = lastNameParts.join(' ');
        
        trackLead('Sell Land Form Submission', {
          em: formData.email,
          ph: formData.phone,
          fn: firstName,
          ln: lastName,
        });

        showToast('Thank you! We will review your property and contact you soon.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          county: undefined,
          state: undefined,
          acreage: undefined,
          askingPrice: undefined,
          timeline: undefined,
          message: undefined,
        });
        onClose();
      } else {
        showToast(result.error || 'Failed to submit property. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showToast('An error occurred. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof SellLandFormData, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sell Your Land" size="lg">
      <p className="text-gray-600 mb-8 leading-relaxed">
        Interested in selling your land? Fill out the form below and we will get back to you with a fair offer.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your name"
          />

          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />

          <Select
            label="State"
            value={formData.state || ''}
            onChange={(e) => handleChange('state', e.target.value as 'OH' | 'WV' | undefined)}
            options={[
              { value: '', label: 'Select a state' },
              ...STATES.map(state => ({ value: state.value, label: state.label }))
            ]}
          />
        </div>

        <Select
          label="County"
          value={formData.county || ''}
          onChange={(e) => handleChange('county', e.target.value || undefined)}
          options={[
            { value: '', label: 'Select a county' },
            ...ALL_COUNTIES.map(county => ({ value: county, label: county }))
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Acreage (approximate)"
            type="number"
            value={formData.acreage || ''}
            onChange={(e) => handleChange('acreage', e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="0"
            step="0.1"
          />

          <Input
            label="Asking Price (optional)"
            type="number"
            value={formData.askingPrice || ''}
            onChange={(e) => handleChange('askingPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder="$0"
          />
        </div>

        <Input
          label="Timeline (optional)"
          value={formData.timeline || ''}
          onChange={(e) => handleChange('timeline', e.target.value || undefined)}
          placeholder="e.g., Looking to sell within 6 months"
        />

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-brown-dark mb-1.5">
            Property Description (optional)
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message || ''}
            onChange={(e) => handleChange('message', e.target.value || undefined)}
            className="w-full px-4 py-2 border border-brown-dark/20 rounded-lg focus:ring-2 focus:ring-green-forest focus:border-transparent transition-all bg-white/50 focus:bg-white"
            placeholder="Tell us about your property (timber type, features, access, etc.)"
          />
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting} className="flex-1">
            Submit Property
          </Button>
        </div>
      </form>
    </Modal>
  );
}
