'use client';

import { useState } from 'react';
import { ProviderInput, providerSchema } from '@/lib/schemas/provider';
import { treeifyError } from 'zod';

type ProviderAccountFormProps = {
  initialValues?: ProviderInput;
  onSubmitUrl?: string;
  method?: 'POST' | 'PUT';
  mode?: 'create' | 'edit';
};

export default function ProviderAccountForm({
  initialValues,
  onSubmitUrl = '/api/provider/create',
  method = 'POST',
  mode = 'create',
}: ProviderAccountFormProps) {

  const defaultValues: ProviderInput = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    status: 'pending', 
    role: 'new'        
  };

  const [formData, setFormData] = useState<ProviderInput>({
    ...defaultValues,
    ...initialValues, // this safely overrides only the defined props
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const result = providerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const flatErrors = result.error.flatten();
      for (const [field, messages] of Object.entries(flatErrors.fieldErrors)) {
        if (messages && messages.length > 0) {
          fieldErrors[field] = messages[0];
        }
      }
      setErrors(fieldErrors);
      setStatus('error');
      return;

    }

    console.log('💬 initialValues', initialValues);
console.log('📦 formData', formData);

    

    try {
      const response = await fetch(onSubmitUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        setStatus('success');
        setErrors({});
        if (mode === 'create') {
          setFormData({ firstName: '', lastName: '', email: '', phone: '', bio: '' });
        }
      } else {
        const errorBody = await response.json();
        console.error('Server error:', errorBody);
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit failed', error);
      setStatus('error');
    }
  };

  const inputClass = "w-full border p-2 rounded-xl";
  const labelClass = "ml-1";
  const divClass = "";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold">
        {mode === 'edit' ? 'Edit Account' : 'Sign Up for a Provider Account'}
      </h2>

      <div className={divClass}>
        <label className={labelClass}>First Name *</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
      </div>

      <div className={divClass}>
        <label className={labelClass}>Last Name *</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
      </div>

      <div className={divClass}>
        <label className={labelClass}>Email *</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          disabled={mode === 'edit'} // email should probably be locked in edit mode
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className={divClass}>
        <label className={labelClass}>Phone *</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className={divClass}>
        <label className={labelClass}>Tell us a little about yourself *</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
      </div>

      <div className="text-center px-10">
        <button type="submit" className="bg-cyan-500 text-white font-semibold px-5 py-2 rounded-xl hover:bg-cyan-700 text-xl w-full">
          {status === 'submitting'
            ? 'Submitting...'
            : mode === 'edit'
              ? 'Save Changes'
              : 'Sign Up'}
        </button>
      </div>



      {status === 'success' && (
        <p className="text-green-600 mt-2">
          {mode === 'edit' ? 'Account updated successfully!' : 'Account created successfully!'}
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-2">There was an error. Please try again.</p>
      )}
    </form>
  );
}
