'use client'

import { FormProvider } from '@/components/FormContext'
import { FormStep } from '@/components/FormStep'
import React from 'react'

export default function page() {
  return (
    <FormProvider>
      <FormStep />
    </FormProvider>
  )
}
