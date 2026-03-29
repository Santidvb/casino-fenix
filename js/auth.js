import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabaseUrl = "https://lqvkylciwpvymejykyzf.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxdmt5bGNpd3B2eW1lanlreXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NjMyMTYsImV4cCI6MjA5MDAzOTIxNn0.t3zxW4oLVHAA9_GZ0yATQxMm_rmKn80GjpGMU1rP7iI"

export const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: {
		persistSession: true, 
		autoRefreshToken: true, 
		detectSessionInUrl: true,
		storageKey: "casino-fenix-auth"
	}
})

console.log("conexión intentada con: ", supabaseUrl);


export async function iniciarSesion(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	})
	if (error) {
		console.log("Error: ", error.message)
		return null
	}
	console.log("Sesion iniciada:", data)
	return data
}

export async function registrarUsuario(email, password, nombre) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) return { error: error.message };

	if(data.user) {
		const { error: profileError } = await supabase.from("profiles").insert([
			{
				id: data.user.id,
				username: nombre,
				dinero_actual: 120,
				mayor_historico: 120
			}
		]);
		if(profileError) {
			console.log("Error creando perfil:", profileError.message);
		}
	}
	return data;
}

