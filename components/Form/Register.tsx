import { Tabs, TextInput } from '@mantine/core'
import {useForm} from '@mantine/form'
import { useState } from 'react'
import WorkerForm from './WorkerForm'
function RegisterForm() {


  return (
    <>
        <Tabs variant='pills' defaultValue='worker'>
            <Tabs.List grow >
                <Tabs.Tab className='outline outline-1 outline-blue-500' value='worker' >Worker</Tabs.Tab>
                <Tabs.Tab className='outline outline-1 outline-blue-500' value='recruiter'>Recruiter</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='worker' pt="xs">
                <WorkerForm/>
            </Tabs.Panel>
            <Tabs.Panel value='recruiter' pt="xs">Recruiter</Tabs.Panel>
        </Tabs>
    </>
  )
}

export default RegisterForm