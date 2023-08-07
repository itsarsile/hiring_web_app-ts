import { Tabs, Text, TextInput } from '@mantine/core'
import WorkerForm from './WorkerForm'
import RecruiterForm from './RecruiterForm'
import { signIn } from 'next-auth/react'
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
            <Tabs.Panel value='recruiter' pt="xs">
              <RecruiterForm />
            </Tabs.Panel>
            <div className="mt-5 text-center">
              Sudah punya akun? <Text component='button' className='text-amber-400' onClick={() => signIn("credentials")}>Login</Text>
            </div>
        </Tabs>
    </>
  )
}

export default RegisterForm