import { useEffect, useState } from 'react';
import Header from './components/Header';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import { useProject } from './store/useProject';
import { supabase } from './lib/supabase';

export default function App() {
  const step = useProject(s => s.step);
  const setStep = useProject(s => s.setStep);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <>
      <Header
        user={user}
        onLogout={() => supabase.auth.signOut()}
        onOpenAuth={() => setShowAuth(true)}
      />
      <main>
        <div className="steps">
          {[1,2,3,4].map(n => (
            <button key={n} className={step === n ? 'active' : ''} onClick={() => setStep(n)}>
              Pasul {n}
            </button>
          ))}
        </div>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 user={user} />}
      </main>
      {showAuth && (
        <div className="card auth">
          <h3>Autentificare</h3>
          <input id="email" type="email" placeholder="Email" />
          <input id="password" type="password" placeholder="Parolă" />
          <button onClick={async () => {
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) alert(error.message);
            else setShowAuth(false);
          }}>Autentificare</button>
          <button className="ghost" onClick={async () => {
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) alert(error.message);
            else alert('Cont creat. Verifică emailul pentru confirmare.');
          }}>Creează cont</button>
          <button className="ghost" onClick={() => setShowAuth(false)}>Închide</button>
        </div>
      )}
    </>
  );
}
