// Trackpad connector (5-pin, through-hole)
//
// Params
//   side: default is F for Front
//     the side on which to place the footprint and designator, either F or B
//   flip: default is false
//     if true, reverses the left-to-right mapping (leftmost becomes P5, then P4, ...)
//   P1..P5: net params for pads from left to right

module.exports = {
	params: {
		designator: 'TP',
		side: 'F',
		flip: false,
		P1: { type: 'net', value: 'P1' },
		P2: { type: 'net', value: 'P2' },
		P3: { type: 'net', value: 'P3' },
		P4: { type: 'net', value: 'P4' },
		P5: { type: 'net', value: 'P5' },
	},
	body: p => {
		// 5 pads, 4mm pitch, centered on origin:
		// x = -8, -4, 0, 4, 8 (mm)
		const pad_size = 1.75
		const drill = 1.10

		const label_y = 2.2
		const label_effects =
			p.side === 'B'
				? '(effects (font (size 0.8 0.8) (thickness 0.12)) (justify mirror))'
				: '(effects (font (size 0.8 0.8) (thickness 0.12)))'

		const pad_xs = [-8, -4, 0, 4, 8]
		const pins = [
			{ label: 'P1', net: p.P1 },
			{ label: 'P2', net: p.P2 },
			{ label: 'P3', net: p.P3 },
			{ label: 'P4', net: p.P4 },
			{ label: 'P5', net: p.P5 },
		]
		const ordered_pins = p.flip ? [...pins].reverse() : pins
		const labels = ordered_pins
			.map(
				(pin, i) =>
					`(fp_text user "${pin.label}" (at ${pad_xs[i]} ${label_y} ${p.r}) (layer "${p.side}.SilkS") ${label_effects})`
			)
			.join('\n\t\t\t')
		const pads = ordered_pins
			.map(
				(pin, i) =>
					`(pad "${i + 1}" thru_hole circle (at ${pad_xs[i]} 0 ${p.r}) (size ${pad_size} ${pad_size}) (drill ${drill}) (layers "*.Cu" "*.Mask") ${pin.net.str})`
			)
			.join('\n\t\t\t')

		return `
		(footprint "trackpad_connector_5p_th"
			(layer "${p.side}.Cu")
			${p.at}

			(property "Reference" "${p.ref}"
				(at 0 3 ${p.r})
				(layer "${p.side}.SilkS")
				${p.ref_hide}
				(effects (font (size 1 1) (thickness 0.15)))
			)
			(property "Value" "trackpad_connector"
				(at 0 -3 ${p.r})
				(layer "${p.side}.Fab")
				hide
				(effects (font (size 1 1) (thickness 0.15)))
			)

			${labels}

			${pads}
		)
		`
	}
}
