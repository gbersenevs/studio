"use client";

import { useState, useTransition } from "react";

type Action<State> = (prevState: State, formData: FormData) => Promise<State>;

export function useActionState<State>(
  action: Action<State>,
  initialState: State
): [State, (formData: FormData) => Promise<void>, boolean] {
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  const formAction = async (formData: FormData) => {
    startTransition(async () => {
      const next = await action(state, formData);
      setState(next);
    });
  };

  return [state, formAction, isPending];
}
