// Generic through-hole connector (1xN)
//
// Params
//   side: default is F for Front
//     the side on which to place the footprint and reference text, either F or B
//   pin_count: number of pins to place (1..20)
//   pitch: distance between adjacent pins in mm (default 4)
//   show_labels: whether to show per-pin labels on silkscreen (default true)
//   flip: default is false
//     if true, reverses the left-to-right mapping (leftmost becomes P{pin_count}, then ...)
//   P1..P20: net params for pins from left to right (when flip is false)
//
// Notes
//   - Pads are centered on the origin.
//   - Pads are numbered 1..pin_count left-to-right.

module.exports = {
	params: {
		designator: 'J',
		side: 'F',
		pin_count: 5,
		pitch: 4,
		show_labels: true,
		flip: false,
		P1: { type: 'net', value: 'P1' },
		P2: { type: 'net', value: 'P2' },
		P3: { type: 'net', value: 'P3' },
		P4: { type: 'net', value: 'P4' },
		P5: { type: 'net', value: 'P5' },
		P6: { type: 'net', value: 'P6' },
		P7: { type: 'net', value: 'P7' },
		P8: { type: 'net', value: 'P8' },
		P9: { type: 'net', value: 'P9' },
		P10: { type: 'net', value: 'P10' },
		P11: { type: 'net', value: 'P11' },
		P12: { type: 'net', value: 'P12' },
		P13: { type: 'net', value: 'P13' },
		P14: { type: 'net', value: 'P14' },
		P15: { type: 'net', value: 'P15' },
		P16: { type: 'net', value: 'P16' },
		P17: { type: 'net', value: 'P17' },
		P18: { type: 'net', value: 'P18' },
		P19: { type: 'net', value: 'P19' },
		P20: { type: 'net', value: 'P20' },
	},
	body: p => {
		const maxPins = 20
		const pinCount = Math.max(1, Math.min(maxPins, Number(p.pin_count) || 1))
		const pitch = Number(p.pitch) || 4

		const pad_size = 1.75
		const drill = 1.10

		const label_y = -2.2
		const label_effects =
			p.side === 'B'
				? '(effects (font (size 0.8 0.8) (thickness 0.12)) (justify mirror))'
				: '(effects (font (size 0.8 0.8) (thickness 0.12)))'

		const nets = [
			p.P1,
			p.P2,
			p.P3,
			p.P4,
			p.P5,
			p.P6,
			p.P7,
			p.P8,
			p.P9,
			p.P10,
			p.P11,
			p.P12,
			p.P13,
			p.P14,
			p.P15,
			p.P16,
			p.P17,
			p.P18,
			p.P19,
			p.P20,
		]

		const x0 = -((pinCount - 1) * pitch) / 2
		const pin_numbers = Array.from({ length: pinCount }, (_, i) => i + 1)
		const mapped_pin_numbers = p.flip ? [...pin_numbers].reverse() : pin_numbers

		const labels = p.show_labels
			? mapped_pin_numbers
					.map((pinNumber, i) => {
						const x = x0 + i * pitch
						return `(fp_text user "P${pinNumber}" (at ${x} ${label_y} ${p.r}) (layer "${p.side}.SilkS") ${label_effects})`
					})
					.join('\n\t\t\t')
			: ''

		const pads = mapped_pin_numbers
			.map((pinNumber, i) => {
				const x = x0 + i * pitch
				const net = nets[pinNumber - 1]
				return `(pad "${i + 1}" thru_hole circle (at ${x} 0 ${p.r}) (size ${pad_size} ${pad_size}) (drill ${drill}) (layers "*.Cu" "*.Mask") ${net.str})`
			})
			.join('\n\t\t\t')

		return `
		(footprint "connectors_1xN_th"
			(layer "${p.side}.Cu")
			${p.at}

			(property "Reference" "${p.ref}"
				(at 0 3 ${p.r})
				(layer "${p.side}.SilkS")
				${p.ref_hide}
				(effects (font (size 1 1) (thickness 0.15)))
			)
			(property "Value" "connector"
				(at 0 -3 ${p.r})
				(layer "${p.side}.Fab")
				hide
				(effects (font (size 1 1) (thickness 0.15)))
			)

			${labels}

			${pads}
		)
		`
	},
}
