// 4-pin momentary tactile switch (through-hole)
// Pin grid: 6.5mm (X) x 4.5mm (Y)
// Electrical: pads 1+2 are one side, pads 3+4 are the other; pressing connects the two sides.
//
// Params
//   side: default is F for Front
//     the side on which to place the reference/silkscreen, either F or B
//   from: net for pads 1 & 2
//   to: net for pads 3 & 4
//   drill: plated hole drill diameter (mm)
//   pad_diameter: plated pad diameter (mm)

module.exports = {
	params: {
		designator: 'B',
		side: 'F',
		from: { type: 'net', value: 'BTN_1' },
		to: { type: 'net', value: 'BTN_2' },
		drill: 1.0,
		pad_diameter: 1.8,
	},
	body: p => {
		const half_x = 3.25
		const half_y = 2.25
		const silk = `${p.side}.SilkS`
		const fab = `${p.side}.Fab`
		const courtyard = `${p.side}.CrtYd`
		const silk_w = 0.12
		const fab_w = 0.10
		const ctyd_w = 0.05
		const body_w = 6.0
		const body_h = 6.0
		const ctyd_margin = 0.5
		const ctyd_wx = body_w / 2 + ctyd_margin
		const ctyd_hy = body_h / 2 + ctyd_margin

		return `
		(footprint "button_4p_65_45"
			(layer "${p.side}.Cu")
			${p.at}

			(property "Reference" "${p.ref}"
				(at 0 ${body_h / 2 + 1.6} ${p.r})
				(layer "${silk}")
				${p.ref_hide}
				(effects (font (size 1 1) (thickness 0.15)))
			)
			(property "Value" "SW_Push"
				(at 0 ${-(body_h / 2 + 1.6)} ${p.r})
				(layer "${fab}")
				hide
				(effects (font (size 1 1) (thickness 0.15)))
			)

			(fp_rect (start ${-body_w / 2} ${-body_h / 2}) (end ${body_w / 2} ${body_h / 2})
				(stroke (width ${silk_w}) (type solid))
				(fill none)
				(layer "${silk}")
			)

			(fp_rect (start ${-body_w / 2} ${-body_h / 2}) (end ${body_w / 2} ${body_h / 2})
				(stroke (width ${fab_w}) (type solid))
				(fill none)
				(layer "${fab}")
			)

			(fp_rect (start ${-ctyd_wx} ${-ctyd_hy}) (end ${ctyd_wx} ${ctyd_hy})
				(stroke (width ${ctyd_w}) (type solid))
				(fill none)
				(layer "${courtyard}")
			)

			(pad "1" thru_hole circle (at ${-half_x} ${half_y} ${p.r}) (size ${p.pad_diameter} ${p.pad_diameter}) (drill ${p.drill}) (layers "*.Cu" "*.Mask") ${p.from.str})
			(pad "2" thru_hole circle (at ${half_x} ${half_y} ${p.r}) (size ${p.pad_diameter} ${p.pad_diameter}) (drill ${p.drill}) (layers "*.Cu" "*.Mask") ${p.from.str})
			(pad "3" thru_hole circle (at ${-half_x} ${-half_y} ${p.r}) (size ${p.pad_diameter} ${p.pad_diameter}) (drill ${p.drill}) (layers "*.Cu" "*.Mask") ${p.to.str})
			(pad "4" thru_hole circle (at ${half_x} ${-half_y} ${p.r}) (size ${p.pad_diameter} ${p.pad_diameter}) (drill ${p.drill}) (layers "*.Cu" "*.Mask") ${p.to.str})
		)
		`
	},
}

