'use client';

import { useState, FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { submitContactForm } from '@/lib/formSubmission';
import { trackLead } from '@/lib/analytics';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingTitle?: string;
}

export function ContactModal({ isOpen, onClose, listingTitle }: ContactModalProps) {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: listingTitle ? `I'm interested in ${listingTitle}` : '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Google Sheets via Google Apps Script
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        listingTitle,
      });

      if (result.success) {
        // Track Lead event with Meta Pixel
        const [firstName, ...lastNameParts] = formData.name.split(' ');
        const lastName = lastNameParts.join(' ');
        
        trackLead(
          listingTitle ? `Property Inquiry: ${listingTitle}` : 'Contact Form Submission',
          {
            em: formData.email,
            ph: formData.phone,
            fn: firstName,
            ln: lastName,
          }
        );

        showToast('Message sent successfully! We will contact you soon.', 'success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        onClose();
      } else {
        showToast(result.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showToast('An error occurred. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Us" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
        />

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className="w-full px-4 py-2 border border-brown-dark/20 rounded-lg focus:ring-2 focus:ring-green-forest focus:border-transparent transition-all bg-white/50 focus:bg-white"
            placeholder="Tell us about your interest..."
          />
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
