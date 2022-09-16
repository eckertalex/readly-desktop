import create from 'zustand'
import {persist} from 'zustand/middleware'
import {logger} from './zustand-logger'

type FontSize = 'sm' | 'md' | 'lg'

type SettingsState = {
	fontSize: FontSize
	setFontSize: (fontSize: FontSize) => void
}

export const useSettingsStore = create<SettingsState>()(
	logger(
		persist(
			(set) => ({
				fontSize: 'md',
				setFontSize: (fontSize) => set(() => ({fontSize}), false),
			}),
			{
				name: '__readly_settings_persist__',
			}
		)
	)
)
