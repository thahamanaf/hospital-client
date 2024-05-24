import React from 'react'
import OutPatientList from '../../components/OutPatientList'

const OutPatient = () => {
  return (
    <div className='p-10'>
      <div>
        <h1 className='font-semibold text-xl'>Out Patients</h1>
      </div>
      <div className='py-3'>
        <OutPatientList/>
      </div>
    </div>
  )
}

export default OutPatient