"use client";

import * as React from "react";

/**
 * Tells page-level animations when the screen loader has finished, so the
 * hero headline doesn't perform behind the curtain. Defaults to `true` for
 * anything rendered outside the provider.
 */
export const LoaderDoneContext = React.createContext(true);

export function useLoaderDone() {
  return React.useContext(LoaderDoneContext);
}
