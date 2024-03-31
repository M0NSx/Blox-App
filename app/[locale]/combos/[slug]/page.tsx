import { getCombo } from '@/lib/actions/actions'
import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {

  const { slug } = params;

  const combo = await getCombo(slug);
  console.log(combo)

  return (
    <div>
      <p>Combo from: {combo?.author}</p>
      <p>Combo description: {combo?.combodescription}</p>
      <p>Combo title: {combo?.combotitle}</p>
      <p>Combo time: {combo?.createdAt.toDateString()}</p>
    </div>
  )
}
