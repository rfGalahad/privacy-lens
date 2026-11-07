import { Plus } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import type { ResultMode, ReviewActions, ReviewDecision, ReviewItem } from '../../../types/review';

import { ItemEditor } from './ItemEditor';
import type { FieldConfig } from './reviewFields';

const TAG_STYLES: Record<string, string> = {
  accepted: 'bg-success-dim text-success',
  edited: 'bg-warning-dim text-warning',
  rejected: 'bg-error-dim text-error',
  pending: 'bg-surface text-text-muted',
  analyst: 'bg-accent-dim text-accent',
};

const DecisionTag = ({ decision, source }: { decision: ReviewDecision; source: 'ai' | 'analyst' }) => {
  const key = source === 'analyst' ? 'analyst' : decision;
  const label = source === 'analyst' ? 'Added by analyst' : decision;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${TAG_STYLES[key]}`}>
      {label}
    </span>
  );
};

const BUTTON_CLASS = 'rounded-sm border border-border px-2.5 py-1 text-xs text-text-primary hover:bg-surface';

type ReviewItemShellProps = {
  item: ReviewItem<object>;
  mode: ResultMode;
  fields: FieldConfig[];
  actions: ReviewActions;
  children: ReactNode;
};

/** Wraps one risk/gap/recommendation: tag, accept/edit/reject controls, inline editor. */
export const ReviewItemShell = ({ item, mode, fields, actions, children }: ReviewItemShellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const isRejected = item.decision === 'rejected';

  if (mode === 'finalized' && isRejected) return null;

  if (isEditing) {
    return (
      <li>
        <ItemEditor
          fields={fields}
          initialValues={item as unknown as Record<string, string>}
          submitLabel="Save changes"
          onCancel={() => setIsEditing(false)}
          onSave={(values) => {
            actions.edit(item.id, values);
            setIsEditing(false);
          }}
        />
      </li>
    );
  }

  return (
    <li className="rounded-sm border border-border bg-surface-2 p-4">
      <div className={isRejected && mode === 'review' ? 'opacity-50' : ''}>{children}</div>

      {mode !== 'view' && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <DecisionTag decision={item.decision} source={item.source} />

          {mode === 'review' && (
            <div className="flex gap-2">
              {item.decision === 'pending' && (
                <button type="button" className={BUTTON_CLASS} onClick={() => actions.decide(item.id, 'accepted')}>
                  Accept
                </button>
              )}
              {!isRejected && (
                <button type="button" className={BUTTON_CLASS} onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              )}
              {!isRejected && (
                <button type="button" className={BUTTON_CLASS} onClick={() => actions.decide(item.id, 'rejected')}>
                  Reject
                </button>
              )}
              {item.decision !== 'pending' && item.decision !== 'edited' && (
                <button type="button" className={BUTTON_CLASS} onClick={() => actions.decide(item.id, 'pending')}>
                  Undo
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </li>
  );
};

/** "+ Add" button that opens the editor for a brand-new analyst item. */
export const AddItem = ({ label, fields, onAdd }: {
  label: string;
  fields: FieldConfig[];
  onAdd: (values: Record<string, string>) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <ItemEditor
        fields={fields}
        submitLabel="Add"
        onCancel={() => setIsOpen(false)}
        onSave={(values) => {
          onAdd(values);
          setIsOpen(false);
        }}
      />
    );
  }

  return (
    <button type="button" onClick={() => setIsOpen(true)}
      className="mt-4 flex items-center gap-2 text-sm text-accent hover:underline">
      <Plus className="h-4 w-4" /> {label}
    </button>
  );
};