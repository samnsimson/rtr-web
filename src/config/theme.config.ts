import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const theme = createSystem(
	defaultConfig,
	defineConfig({
		theme: {
			tokens: {
				fonts: {
					heading: { value: "'Poppins', sans-serif" },
					body: { value: "'Quicksand', sans-serif" },
					mono: { value: "IBM Plex Mono" },
				},
			},
			semanticTokens: {
				colors: {
					bg: {
						DEFAULT: { value: { _light: "{colors.white}", _dark: "#1a202c" } },
						dark: { value: { _light: "{colors.white}", _dark: "#2d333c" } },
						card: { value: { _light: "{colors.gray.50}", _dark: "#2d3748" } },
					},

					fg: {
						DEFAULT: { value: { _light: "{colors.black}", _dark: "#e5e5e5" } },
						muted: { value: { _light: "{colors.gray.600}", _dark: "#a3a3a3" } },
						inverted: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
					},

					primary: {
						DEFAULT: { value: { _light: "#3182CE", _dark: "#4299E1" } },
						muted: { value: { _light: "#EBF8FF", _dark: "#2C5282" } },
						foreground: { value: { _light: "{colors.white}", _dark: "{colors.white}" } },
					},

					secondary: {
						DEFAULT: { value: { _light: "#ED8936", _dark: "#F6AD55" } },
						muted: { value: { _light: "#FEEBC8", _dark: "#744210" } },
						foreground: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
					},

					accent: {
						DEFAULT: { value: { _light: "#9F7AEA", _dark: "#B794F4" } },
						muted: { value: { _light: "#FAF5FF", _dark: "#44337A" } },
						foreground: { value: { _light: "{colors.white}", _dark: "{colors.white}" } },
					},

					info: {
						DEFAULT: { value: { _light: "#3182CE", _dark: "#3182CE" } },
						muted: { value: { _light: "#EBF8FF", _dark: "#1A365D" } },
						foreground: { value: { _light: "{colors.black}", _dark: "{colors.white}" } },
					},

					success: {
						DEFAULT: { value: { _light: "#48BB78", _dark: "#68D391" } },
						muted: { value: { _light: "#F0FFF4", _dark: "#22543D" } },
						foreground: { value: { _light: "{colors.white}", _dark: "{colors.white}" } },
					},

					warning: {
						DEFAULT: { value: { _light: "#ECC94B", _dark: "#F6E05E" } },
						muted: { value: { _light: "#FFFAF0", _dark: "#744210" } },
						foreground: { value: { _light: "{colors.black}", _dark: "{colors.black}" } },
					},

					danger: {
						DEFAULT: { value: { _light: "#F56565", _dark: "#FC8181" } },
						muted: { value: { _light: "#FFF5F5", _dark: "#742A2A" } },
						foreground: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
					},

					border: {
						DEFAULT: { value: { _light: "#E2E8F0", _dark: "#4A5568" } },
						strong: { value: { _light: "#CBD5E0", _dark: "#718096" } },
						accent: { value: { _light: "#3182CE", _dark: "#4299E1" } },
					},

					focus: { value: { _light: "#3182CE", _dark: "#4299E1" } },
					hover: { value: { _light: "{colors.primary.DEFAULT}", _dark: "{colors.primary.DEFAULT}" } },
					disabled: { value: { _light: "{colors.gray.300}", _dark: "{colors.gray.600}" } },
				},
			},
		},
	}),
);

export default theme;
