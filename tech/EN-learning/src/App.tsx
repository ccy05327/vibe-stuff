import React, { useState, useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'
import AuthComponent from './Auth'
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div className="container">
        <div className="auth-container">
          <h1>Welcome to AusLingo</h1>
          <p>Your personalized Australian English learning platform</p>
          <AuthComponent />
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Welcome to AusLingo!</h1>
        <p>Hello, {session.user.email}!</p>
        <p>You're successfully logged in and ready to start learning Australian English.</p>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="sign-out-btn"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default App
