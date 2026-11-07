import { useState } from 'react';

import type { FieldConfig } from './reviewFields';

type ItemEditorProps = {
  fields: FieldConfig[];
  initialValues?: Record<string, string>;
  submitLabel: string;
  onSave: (values: Record<string, string>) => void;
  onCancel: () => void;
};

const INPUT_CLASS =
  'w-full rounded-sm border border-input-border bg-input-bg px-3 py-2 text-sm text-text-primary focus:border-input-border-focus focus:outline-none';

const defaultValue = (field: FieldConfig) =>
  field.type === 'select' ? (field.options?.includes('medium') ? 'medium' : field.options?.[0] ?? '') : '';

export const ItemEditor = ({ fields, initialValues, submitLabel, onSave, onCancel }: ItemEditorProps) => {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, initialValues?.[f.key] ?? defaultValue(f)])),
  );

  const canSave = fields.every((f) => values[f.key]?.trim());
  const setValue = (key: string, value: string) => setValues((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-col gap-3 rounded-sm border border-accent/40 bg-surface-2 p-4">
      {fields.map((field) => (
        <label key={field.key} className="flex flex-col gap-1 text-xs text-text-secondary">
          {field.label}
          {field.type === 'textarea' ? (
            <textarea
              rows={3}
              maxLength={1000}
              className={INPUT_CLASS}
              value={values[field.key]}
              onChange={(e) => setValue(field.key, e.target.value)}
            />
          ) : field.type === 'select' ? (
            <select
              className={`${INPUT_CLASS} capitalize`}
              value={values[field.key]}
              onChange={(e) => setValue(field.key, e.target.value)}
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              maxLength={200}
              className={INPUT_CLASS}
              value={values[field.key]}
              onChange={(e) => setValue(field.key, e.target.value)}
            />
          )}
        </label>
      ))}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel}
          className="rounded-sm border border-border px-3 py-1.5 text-sm text-text-primary hover:bg-surface">
          Cancel
        </button>
        <button type="button" disabled={!canSave} onClick={() => onSave(values)}
          className="rounded-sm bg-accent px-3 py-1.5 text-sm font-semibold text-text-on-light-primary hover:bg-accent-hover disabled:opacity-40">
          {submitLabel}
        </button>
      </div>
    </div>
  );
};