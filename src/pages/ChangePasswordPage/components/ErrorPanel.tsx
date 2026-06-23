import { LogIn } from 'lucide-react';

import assets from '@/assets/assets';
import LinkButton from '@/shared/components/LinkButton';

import '../styles/ChangePasswordPage.css';

const ErrorPanel = () => {

  return (
    <main 
      className="page"
      style={{ backgroundImage: `url(${assets.pdgBackground})` }}
    >
      <section className="card">
        <h1 className="heading">Link <em>invalid.</em></h1>
        <p className="subtitle">
          This page is only accessible from the link sent to your email.
        </p>
        <LinkButton 
          href="/login" 
          label="Back to login" 
          icon={LogIn}
        />
      </section>
    </main>
  );
};

export default ErrorPanel;