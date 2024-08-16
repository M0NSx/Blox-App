

import { cp } from 'fs'
import Link from 'next/link'
import React from 'react'

const comboTypes = ['PVP', 'PVE', 'Grind', 'Any']
const comboDifficulties = ['No Skill', 'Medium', 'Hard', 'Any']
const comboStats = ['Max Fruit', 'Max Sword', 'Max Gun', 'Hybrid', 'None', 'Any']
const comboRaces = ['Human', 'Ghoul', 'Fishman', 'Cyborg', 'Skypian', 'Mink', 'Any']

export default function Page() {

  return (
    <div className="flex flex-col p-4">
      <h1>Combo listing</h1>
      <input type="text" placeholder="Search..." className='w-full mb-4' />
      <div className="flex-1 md:flex mb-4">
        <h2 className="text-lg font-bold mb-2">Races</h2>
        <div className='text-sm mb-2 text-c'>
          {comboRaces.map((race) => (
            <Link href='/' ><p className='hover:underline ' key={race}>{race}</p></Link>
          ))}
        </div>
      </div>
    </div>
  )
}
