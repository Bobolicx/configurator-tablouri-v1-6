import { supabase } from '../lib/supabase';

interface Props {
  user: any;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Header({ user, onLogout, onOpenAuth }: Props) {
  return (
    <header>
      <h1>Configurator tablouri — V1.6</h1>
      <div>
        {user ? (
          <button className="ghost" onClick={onLogout}>Ieși</button>
        ) : (
          <button className="ghost" onClick={onOpenAuth}>Cont</button>
        )}
      </div>
    </header>
  );
}
