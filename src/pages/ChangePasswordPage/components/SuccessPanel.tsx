import { Check, LogIn } from 'lucide-react';

import LinkButton from '@/shared/components/LinkButton';

import '../styles/SuccessPanel.css';

interface SuccessPanelProps {
  method: 'password' | 'google';
}

const SuccessPanel = ({ method }: SuccessPanelProps) => {

  const isGoogle = method === 'google';

  return (
    <div className="success-panel visible" role="status" aria-live="polite">
      <div className="success-panel__icon" aria-hidden="true">
        <Check size={28} stroke="#4ab87e" strokeWidth={2} />
      </div>
      <h2 className="success-panel__heading">
        {
          isGoogle 
          ? <>Google <em>connected.</em></> 
          : <>Password <em>set.</em></>
        }
      </h2>
      <p className="success-panel__description">
        {isGoogle
          ? 'Your Google account is linked. Sign in anytime using Google.'
          : 'Your password is set. You can now sign in with your new credentials.'}
      </p>

      <LinkButton 
        href="/login" 
        label="Go to login" 
        icon={LogIn}
      />
    </div>
  );
};

export default SuccessPanel;