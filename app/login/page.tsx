import BanditoLogin from "../components/BanditoLogin";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center p-6 md:p-10">
      <section className="w-full rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Endpoint Publico
        </p>
        <h1 className="mt-2 font-mono text-3xl text-white">Login de Acceso</h1>
        <p className="mt-2 text-sm text-gray-300">
          Solicita tu Magic Link para ingresar a zonas restringidas de DEMA.
        </p>

        <div className="mt-6">
          <BanditoLogin />
        </div>
      </section>
    </main>
  );
}
