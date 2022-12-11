import { resolve } from 'path';

import React, { ReactNode, useMemo } from 'react';

import context from './configContext';

interface ConfigProviderProps {
	children: ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps) => {
	const rootDir = useMemo(
		() => `${process.cwd()}${
				process.env.NODE_ENV === 'development' ? '/dev-monorepo' : ''
			}`,
		[]
	);

	return (
  <context.Provider
    value={{
				dirs: {
					root: rootDir,
					rootPackageJSON: resolve(rootDir, 'package.json'),
				},
			}}
		>
    {children}
  </context.Provider>
	);
};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | undefined;
		}
	}
}

export default ConfigProvider;
