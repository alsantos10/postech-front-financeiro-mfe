"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@dash/auth/context/AuthContext";
import Button from "@dash/ui-kit/Button";
import { Input } from "@dash/ui-kit/Input";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve conter ao menos 2 caracteres"),
  email: z.string().email("Informe um e-mail válido").optional(),
  password: z.union([
    z.string().min(6, "Senha deve conter ao menos 6 caracteres"),
    z.literal(""),
  ]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileAccountPage() {
  const { user, loading, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, password: "" });
    }
  }, [user, reset]);

  async function onSubmit(data: ProfileFormData) {
    try {
      await updateProfile(data.name, data.password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#E4EDE3] px-4">
      <section className="mx-auto max-w-5xl rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Minha conta</h1>
            <p className="mt-1 text-sm text-zinc-600">Perfil administrativo</p>
          </div>
          <span className="rounded-full bg-[#dff7e9] px-4 py-2 text-xs font-bold uppercase tracking-wide text-green-500">
            Admin
          </span>
        </div>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]">
          <aside className="rounded-2xl border border-zinc-200 bg-[#f8f8f8] p-6">
            <div className="flex min-h-105 items-center justify-center">
              {loading ? (
                <div className="h-80 w-full animate-pulse rounded-2xl bg-zinc-200 shadow-sm" />
              ) : (
                <img
                  src="/illustrations/fundoPerfil.svg"
                  alt="Ilustração do perfil"
                  className="max-h-95 w-full rounded-2xl object-cover shadow-sm"
                />
              )}
            </div>
          </aside>

          <section className="flex flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-6">
            {loading ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded-md bg-zinc-200" />
                  <div className="h-12 w-full animate-pulse rounded-lg bg-zinc-200" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded-md bg-zinc-200" />
                  <div className="h-12 w-full animate-pulse rounded-lg bg-zinc-200" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded-md bg-zinc-200" />
                  <div className="h-12 w-full animate-pulse rounded-lg bg-zinc-200" />
                </div>
                <div className="pt-2">
                  <div className="h-12 w-full animate-pulse rounded-lg bg-zinc-200" />
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Nome"
                  type="text"
                  placeholder="Nome"
                  {...register("name")}
                  error={errors.name?.message}
                  className="rounded-lg border-emerald-600 bg-white px-4 py-3 text-zinc-800 shadow-sm"
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="E-mail"
                  value={user?.email ?? "joanadasilvaoliveira@email.com.br"}
                  readOnly
                  aria-readonly="true"
                  disabled={true}
                  className="rounded-lg border-emerald-600 bg-zinc-200 px-4 py-3 text-zinc-800 shadow-sm"
                  error={errors.email?.message}
                />

                <Input
                  label="Senha"
                  type="password"
                  placeholder="Senha"
                  {...register("password")}
                  error={errors.password?.message}
                  className="rounded-lg border-emerald-600  px-4 py-3 text-zinc-800 shadow-sm"
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-bold shadow-sm hover:bg-orange-600 focus-visible:ring-orange-600"
                  >
                    {isSubmitting ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </div>
              </form>
            )}
          </section>
        </section>
      </section>
    </div>
  );
}
