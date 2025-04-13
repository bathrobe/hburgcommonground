'use server'

export async function deployAction() {
  try {
    const deployHook = process.env.DEPLOY_HOOK
    if (!deployHook) {
      console.error('DEPLOY_HOOK environment variable is not set')
      return
    }

    const response = await fetch(deployHook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Failed to trigger deployment:', response.statusText)
    } else {
      console.log('Deployment triggered successfully')
    }
  } catch (error) {
    console.error('Error triggering deployment:', error)
  }
}
