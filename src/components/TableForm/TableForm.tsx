import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query"

import {
    Button,
    Checkbox,
    Form,
    Input,
    InputNumber,
    type FormProps
} from "antd"

import { productsAPI } from "../../api/productsAPI"

import { firstLetterToUpperCase } from "../../utils/common-utils"

import styles from './Form.module.css'

export type TProduct = {
    name: string;
    price: number | string;
    category: string;
    inStock: boolean;
    brand: string
}

export type TTableForm = {
    name: string,
    price: string,
    category: string,
    inStock: boolean,
    brand: string
}

type TFormFieldData = {
    type: React.HTMLInputTypeAttribute,
    step?: number,
    field: "name" | "price" | "category" | "brand" | "inStock"
}
const formFieldsData: TFormFieldData[] = [
    {
        type: 'text',
        field: 'name',
    },
    {
        type: 'number',
        step: 0.01,
        field: 'price',
    },
    {
        type: 'text',
        field: 'category',
    },
    {
        type: 'text',
        field: 'brand',
    },
    {
        type: 'checkbox',
        field: 'inStock',
    },
]

const getFormComponent = (el: TFormFieldData) => {
    switch (el.type) {
        case 'checkbox':
            return <Form.Item<TTableForm>
                name={el.field}
                valuePropName="checked"
                label={null}
            >
                <Checkbox
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {firstLetterToUpperCase(el.field)}
                </Checkbox>
            </Form.Item>

        case 'number':
            return <Form.Item<TTableForm>
                label={firstLetterToUpperCase(el.field)}
                name={el.field}
                rules={[
                    { required: true, message: `Please input valid product ${el.field}!` },
                ]}
            >
                <InputNumber
                    step={0.01}
                    min={0}
                    max={Number.MAX_SAFE_INTEGER}
                    style={{ width: '100%' }}
                />
            </Form.Item>

        case 'text':
        default:
            return <Form.Item<TTableForm>
                label={firstLetterToUpperCase(el.field)}
                name={el.field}
                rules={[{ required: true, message: `Please input product ${el.field}!` }]}
            >
                <Input minLength={3} />
            </Form.Item>
    }
}

export const TableForm = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (newProduct: TProduct) => productsAPI.create(newProduct),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
    })

    const [form] = Form.useForm()

    const onSubmit: FormProps<TTableForm>['onFinish'] = async (data) => {
        mutation.mutate(data)
        form.resetFields()
    }

    const onFinishFailed: FormProps<TTableForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            form={form}
            disabled={mutation.isPending}
            name="basic"
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.container}
        >
            {formFieldsData.map((el) => {
                return <div key={el.field}>
                    {getFormComponent(el)}
                </div>
            })}

            <Form.Item label={null}>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}
