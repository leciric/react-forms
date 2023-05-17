'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase()
    .refine((email) => email.endsWith('@rocketseat.com.br')),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  const [output, setOutput] = useState('')

  function createUser(data: any) {
    console.log(data)
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10 bg-zinc-950 text-zinc-300">
      <form onSubmit={handleSubmit(createUser)} className="flex flex-col gap-4">
        <div className="flex w-full max-w-xs flex-col gap-1">
          <label htmlFor="">Nome</label>
          <input
            type="text"
            className="h-10 rounded border border-zinc-600 bg-zinc-900 px-3 text-white shadow-sm"
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="flex w-full max-w-xs flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            className="h-10 rounded border border-zinc-600 bg-zinc-900 px-3 text-white shadow-sm"
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input
            type="password"
            className="h-10 rounded border border-zinc-600 bg-zinc-900 px-3 text-white shadow-sm"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          className="h-10 rounded bg-emerald-500 px-3 font-semibold text-white hover:bg-emerald-600"
        >
          Salvar
        </button>
      </form>

      <pre>{output}</pre>
    </main>
  )
}
