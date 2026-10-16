"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { LogOut, Plus, Save, Trash2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const ADMIN_EMAIL = "classicphoto495@gmail.com";
const BUCKET = "beclassic-gallery";
type Tab = "packages" | "packageCategories" | "gallery" | "galleryCategories" | "services";
type Row = Record<string, any>;

const inputClass = "w-full rounded-xl border border-ink-700 bg-ink-950/70 px-4 py-3 text-ink-100 outline-none focus:border-gold-400";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400";

function lines(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function toLines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function slug(value: string) {
  return value.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ContentAdmin() {
  const { refresh } = useSiteContent();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const email = ADMIN_EMAIL;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>("packages");
  const [rows, setRows] = useState<Row[]>([]);
  const [packageCategories, setPackageCategories] = useState<Row[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);

  const tableByTab: Record<Tab, string> = {
    packages: "packages",
    packageCategories: "package_categories",
    gallery: "gallery_items",
    galleryCategories: "gallery_categories",
    services: "additional_services",
  };
  const sortColumn = tab.includes("Categories") ? "sort_order" : "sort_order";

  const loadTab = async () => {
    setBusy(true);
    setError("");
    const { data, error: loadError } = await supabase.from(tableByTab[tab]).select("*").order(sortColumn);
    if (loadError) setError(loadError.message);
    else setRows(data || []);
    if (tab === "packages" || tab === "gallery") {
      const catTable = tab === "packages" ? "package_categories" : "gallery_categories";
      const { data: cats, error: catsError } = await supabase.from(catTable).select("id,name").order("sort_order");
      if (catsError) setError(catsError.message);
      else if (tab === "packages") setPackageCategories(cats || []);
      else setGalleryCategories(cats || []);
    }
    setBusy(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const currentEmail = data.session?.user.email?.toLowerCase() || null;
      if (currentEmail && currentEmail !== ADMIN_EMAIL) {
        supabase.auth.signOut();
        setError("This account does not have admin access.");
      } else setUserEmail(currentEmail);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentEmail = session?.user.email?.toLowerCase() || null;
      if (currentEmail && currentEmail !== ADMIN_EMAIL) {
        setError("This account does not have admin access.");
        void supabase.auth.signOut();
        setUserEmail(null);
      } else setUserEmail(currentEmail);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail === ADMIN_EMAIL) void loadTab();
  // loadTab is intentionally rerun when the selected admin section changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, userEmail]);

  const sendLoginLink = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true, emailRedirectTo: `${window.location.origin}/admin` },
    });
    if (authError) setError(authError.message);
    else setMessage("If this email is enabled in Supabase Auth, a sign-in link is on its way.");
    setBusy(false);
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    let payload: Row;
    if (tab === "packages") {
      const name = String(form.get("name") || "").trim();
      payload = {
        id: String(form.get("id") || slug(name)),
        name,
        category_id: String(form.get("category_id") || ""),
        service_type: String(form.get("service_type") || ""),
        price: String(form.get("price") || ""),
        description: String(form.get("description") || ""),
        features: toLines(String(form.get("features") || "")),
        whats_included: toLines(String(form.get("whats_included") || "")),
        highlights: toLines(String(form.get("highlights") || "")),
        gallery: toLines(String(form.get("gallery") || "")),
        related: toLines(String(form.get("related") || "")),
        popular: form.get("popular") === "on",
        duration: String(form.get("duration") || "") || null,
        sort_order: Number(form.get("sort_order") || 0),
      };
    } else if (tab === "gallery") {
      const title = String(form.get("title") || "").trim();
      payload = {
        id: String(form.get("id") || slug(title || String(form.get("alt") || "photo"))),
        src: String(form.get("src") || "").trim(),
        alt: String(form.get("alt") || "").trim(),
        title: title || null,
        subtitle: String(form.get("subtitle") || "").trim() || null,
        category_id: String(form.get("category_id") || ""),
        width: Number(form.get("width") || 800),
        height: Number(form.get("height") || 1000),
        sort_order: Number(form.get("sort_order") || 0),
      };
    } else if (tab === "packageCategories" || tab === "galleryCategories") {
      const name = String(form.get("name") || "").trim();
      payload = {
        id: String(form.get("id") || slug(name)),
        name,
        sort_order: Number(form.get("sort_order") || 0),
      };
    } else {
      payload = {
        id: String(form.get("id") || slug(String(form.get("name") || ""))),
        name: String(form.get("name") || "").trim(),
        price: String(form.get("price") || "").trim(),
        description: String(form.get("description") || "").trim(),
        sort_order: Number(form.get("sort_order") || 0),
      };
    }
    const missingRequired = tab === "gallery"
      ? !payload.src || !payload.category_id || !payload.alt
      : !payload.name || (tab === "packages" && (!payload.price || !payload.category_id));
    if (missingRequired) {
      setError("Please fill in the required fields.");
      setBusy(false);
      return;
    }
    const { error: saveError } = await supabase.from(tableByTab[tab]).upsert(payload);
    if (saveError) setError(saveError.message);
    else {
      setEditing(null);
      setMessage("Saved. Updates are now live on the website.");
      await loadTab();
      await refresh();
    }
    setBusy(false);
  };

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete “${row.name || row.title || row.id}”?`)) return;
    setBusy(true);
    setError("");
    const { error: deleteError } = await supabase.from(tableByTab[tab]).delete().eq("id", row.id);
    if (deleteError) setError(deleteError.message);
    else {
      setRows((current) => current.filter((item) => item.id !== row.id));
      setMessage("Deleted.");
      await refresh();
    }
    setBusy(false);
  };

  const upload = async (file: File, onUrl: (url: string) => void) => {
    setBusy(true);
    setError("");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const path = `${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false });
    if (uploadError) setError(uploadError.message);
    else onUrl(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
    setBusy(false);
  };

  const beginEdit = (row?: Row) => {
    if (!row) {
      setEditing({ sort_order: rows.length, width: 800, height: 1000, features: "", whats_included: "", highlights: "", gallery: "", related: "" });
      return;
    }
    const copied = { ...row };
    if (tab === "packages") {
      copied.features = lines(row.features);
      copied.whats_included = lines(row.whats_included);
      copied.highlights = lines(row.highlights);
      copied.gallery = lines(row.gallery);
      copied.related = lines(row.related);
    }
    setEditing(copied);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "packages", label: "Packages" },
    { id: "packageCategories", label: "Package categories" },
    { id: "gallery", label: "Gallery" },
    { id: "galleryCategories", label: "Gallery categories" },
    { id: "services", label: "Add-on services" },
  ];

  if (userEmail !== ADMIN_EMAIL) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-32 pb-24">
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-400">Beclassic Photography</p>
          <h1 className="mb-3 font-display text-3xl font-bold text-ink-50">Content admin</h1>
          <p className="mb-6 text-sm leading-relaxed text-ink-400">Sign in with the authorized admin email to manage packages and gallery content.</p>
          <form onSubmit={sendLoginLink} className="space-y-4">
            <label className={labelClass} htmlFor="admin-email">Admin email</label>
            <input id="admin-email" type="email" autoComplete="email" required value={email} readOnly className={`${inputClass} opacity-80`} />
            <button disabled={busy} className="w-full rounded-xl bg-gold-400 px-5 py-3 font-bold text-ink-950 disabled:opacity-50">{busy ? "Sending…" : "Email me a sign-in link"}</button>
          </form>
          {message && <p className="mt-4 text-sm text-emerald-400">{message}</p>}
          {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">Beclassic Photography</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink-50 sm:text-4xl">Content admin</h1>
          <p className="mt-2 text-sm text-ink-400">Signed in as {userEmail}. Changes publish to the website as soon as you save.</p>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-ink-200 hover:border-gold-400/60"><LogOut size={16} /> Sign out</button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((item) => <button key={item.id} onClick={() => { setTab(item.id); setEditing(null); setError(""); setMessage(""); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === item.id ? "bg-gold-400 text-ink-950" : "border border-border text-ink-300 hover:border-gold-400/50"}`}>{item.label}</button>)}
      </div>

      {message && <p className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{message}</p>}
      {error && <p className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
        <section className="rounded-3xl border border-border bg-surface p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-ink-50">{tabs.find((item) => item.id === tab)?.label}</h2>
            <button onClick={() => beginEdit()} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-2 text-sm font-bold text-ink-950"><Plus size={16} /> Add new</button>
          </div>
          {busy && rows.length === 0 ? <p className="text-sm text-ink-400">Loading…</p> : (
            <div className="space-y-2">
              {rows.map((row) => <div key={row.id} className="flex items-center gap-3 rounded-2xl border border-ink-800 p-3">
                {tab === "gallery" && <Image src={row.src} alt="" width={64} height={56} unoptimized className="h-14 w-16 rounded-lg object-cover" />}
                <div className="min-w-0 flex-1"><p className="truncate font-semibold text-ink-100">{row.name || row.title || row.id}</p><p className="truncate text-xs text-ink-400">{tab === "packages" || tab === "services" ? row.price : row.category_id || row.src || row.sort_order}</p></div>
                <button onClick={() => beginEdit(row)} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-ink-200 hover:border-gold-400/60">Edit</button>
                <button onClick={() => void remove(row)} aria-label="Delete" className="rounded-full border border-rose-500/30 p-2 text-rose-300 hover:bg-rose-500/10"><Trash2 size={15} /></button>
              </div>)}
              {!rows.length && <p className="py-8 text-center text-sm text-ink-400">No items yet.</p>}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-border bg-surface p-5 sm:p-7">
          <h2 className="mb-5 font-display text-xl font-bold text-ink-50">{editing?.id ? "Edit item" : "Create item"}</h2>
          {!editing ? <p className="text-sm text-ink-400">Choose an item to edit, or select “Add new”.</p> : (
            <form key={`${tab}-${editing.id || "new"}`} onSubmit={save} className="space-y-4">
              {tab !== "gallery" && tab !== "packageCategories" && tab !== "galleryCategories" && <Field label="Name" name="name" defaultValue={editing.name || ""} required />}
              {(tab === "packages" || tab === "services") && <Field label="Price" name="price" defaultValue={editing.price || ""} required />}
              {tab === "packages" && <>
                <SelectField label="Category" name="category_id" options={packageCategories} defaultValue={editing.category_id || ""} />
                <Field label="Service type" name="service_type" defaultValue={editing.service_type || ""} />
                <TextField label="Description" name="description" defaultValue={editing.description || ""} />
                <TextField label="Features (one per line)" name="features" defaultValue={editing.features || ""} />
                <TextField label="What's included (one per line)" name="whats_included" defaultValue={editing.whats_included || ""} />
                <TextField label="Highlights (one per line)" name="highlights" defaultValue={editing.highlights || ""} />
                <TextField label="Package images (one URL per line)" name="gallery" defaultValue={editing.gallery || ""} />
                <FileUpload label="Upload package image" busy={busy} targetField="gallery" append uploadFile={upload} onUpload={(url) => setEditing((current) => ({ ...current!, gallery: `${current?.gallery ? `${current.gallery}\n` : ""}${url}` }))} />
                <Field label="Duration" name="duration" defaultValue={editing.duration || ""} />
                <TextField label="Related package IDs (one per line)" name="related" defaultValue={editing.related || ""} />
                <label className="flex items-center gap-2 text-sm text-ink-200"><input type="checkbox" name="popular" defaultChecked={editing.popular || false} /> Mark as popular</label>
              </>}
              {tab === "gallery" && <>
                <SelectField label="Gallery category" name="category_id" options={galleryCategories} defaultValue={editing.category_id || ""} />
                <Field label="Image URL" name="src" defaultValue={editing.src || ""} />
                <FileUpload label="Upload gallery photo" busy={busy} targetField="src" uploadFile={upload} onUpload={(url) => setEditing((current) => ({ ...current!, src: url }))} />
                <Field label="Image description (alt text)" name="alt" defaultValue={editing.alt || ""} />
                <Field label="Title" name="title" defaultValue={editing.title || ""} />
                <Field label="Subtitle" name="subtitle" defaultValue={editing.subtitle || ""} />
                <div className="grid grid-cols-2 gap-3"><Field label="Width" name="width" type="number" defaultValue={editing.width || 800} /><Field label="Height" name="height" type="number" defaultValue={editing.height || 1000} /></div>
              </>}
              {(tab === "packageCategories" || tab === "galleryCategories") && <Field label="Category name" name="name" defaultValue={editing.name || ""} required />}
              {tab === "services" && <TextField label="Description" name="description" defaultValue={editing.description || ""} />}
              <div className="grid grid-cols-2 gap-3"><Field label="ID (leave blank to create from name)" name="id" defaultValue={editing.id || ""} readOnly={Boolean(editing.id)} /><Field label="Display order" name="sort_order" type="number" defaultValue={editing.sort_order ?? rows.length} /></div>
              <div className="flex gap-3 pt-2"><button disabled={busy} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-3 font-bold text-ink-950 disabled:opacity-50"><Save size={16} /> {busy ? "Saving…" : "Save changes"}</button><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-border px-4 text-sm text-ink-300">Cancel</button></div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, type = "text", required = false, disabled = false, readOnly = false }: { label: string; name: string; defaultValue: string | number; type?: string; required?: boolean; disabled?: boolean; readOnly?: boolean }) {
  return <label className="block"><span className={labelClass}>{label}</span><input className={inputClass} name={name} type={type} defaultValue={defaultValue} required={required} disabled={disabled} readOnly={readOnly} /></label>;
}

function TextField({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return <label className="block"><span className={labelClass}>{label}</span><textarea className={`${inputClass} min-h-24`} name={name} defaultValue={defaultValue} /></label>;
}

function SelectField({ label, name, options, defaultValue }: { label: string; name: string; options: Row[]; defaultValue: string }) {
  return <label className="block"><span className={labelClass}>{label}</span><select className={inputClass} name={name} defaultValue={defaultValue} required><option value="">Select a category</option>{options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></label>;
}

function FileUpload({ label, busy, targetField, append = false, uploadFile, onUpload }: { label: string; busy: boolean; targetField: string; append?: boolean; uploadFile: (file: File, onUrl: (url: string) => void) => Promise<void>; onUpload: (url: string) => void }) {
  return <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gold-400/40 px-4 py-3 text-sm font-semibold text-gold-300 hover:bg-gold-400/5"><Upload size={16} /> {label}<input type="file" accept="image/*" disabled={busy} className="sr-only" onChange={(event) => { const input = event.currentTarget; const file = input.files?.[0]; const form = input.closest("form"); if (file) void uploadFile(file, (url) => { const target = form?.elements.namedItem(targetField) as HTMLInputElement | HTMLTextAreaElement | null; if (target) target.value = append ? `${target.value ? `${target.value}\n` : ""}${url}` : url; onUpload(url); }); input.value = ""; }} /></label>;
}
