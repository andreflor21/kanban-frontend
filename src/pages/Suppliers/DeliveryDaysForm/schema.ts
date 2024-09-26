import * as yup from "yup"

const daySchema = yup.object().shape({
	checked: yup.boolean(),
	time: yup.string(),
	period: yup.string(),
	id: yup.number(),
	key: yup.string(),
})

export type DaySchemaType = yup.InferType<typeof daySchema>

export const deliveryDaysSchema = yup.object().shape({
	allDays: yup.array().of(daySchema),
})

export type DeliveryDaysSchemaType = yup.InferType<typeof deliveryDaysSchema>

export const EMPTY_DELIVERY_DAYS: DeliveryDaysSchemaType = {
	allDays: [],
}

export const DELIVERY_DAYS_OPTIONS: DaySchemaType[] = [
	{
		checked: false,
		time: undefined,
		period: undefined,
		id: 0,
		key: "Domingo",
	},
	{
		checked: false,
		time: undefined,
		period: undefined,
		id: 1,
		key: "Segunda-feira",
	},
	{
		checked: false,
		time: undefined,
		period: undefined,
		id: 2,
		key: "Terça-feira",
	},
	{
		checked: false,
		time: undefined,
		period: undefined,
		id: 3,
		key: "Quarta-feira",
	},
	{
		checked: false,
		time: undefined,
		period: undefined,
		id: 4,
		key: "Quinta-feira",
	},
	{
		checked: false,
		time: undefined,
		period: undefined,
		id: 5,
		key: "Sexta-feira",
	},
	{
		checked: false,
		time: undefined,
		period: undefined,
		id: 6,
		key: "Sábado",
	},
]

export const PERIODS = [
	{
		label: "Manhã",
		value: "Manhã",
	},
	{
		label: "Tarde",
		value: "Tarde",
	},
	{
		label: "Noite",
		value: "Noite",
	},
]
