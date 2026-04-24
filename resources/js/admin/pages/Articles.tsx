import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    TrendingUp,
    Calendar,
    User,
    FileText,
    Save,
    X,
    Type,
    AlignLeft,
    Image as ImageIcon,
    Tag,
    Layers,
    ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ModalPortal from "../../components/ModalPortal";
import ImageUploader from "../../components/ImageUploader";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToast } from "../../services/ToastContext";
import { useAuth } from "../../services/AuthContext";

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: { id: number; name: string } | null;
    category_id: number | null;
    is_published: boolean;
    views: number;
    created_at: string;
    image?: string;
    category?: { name: string };
    tags?: Array<{ id: number; name: string }>;
}

interface ArticleForm {
    title: string;
    excerpt: string;
    content: string;
    is_published: boolean;
    category_id: number | null;
    tag_ids: number[];
    image: string | null;
}

type Category = { id: number; name: string; type?: string };
type TagItem = { id: number; name: string };

export default function AdminArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Article | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<TagItem[]>([]);
    const [formData, setFormData] = useState<ArticleForm>({
        title: "",
        excerpt: "",
        content: "",
        is_published: true,
        category_id: null,
        tag_ids: [],
        image: null,
    });

    useEffect(() => {
        fetchArticles();
        fetchMeta();
    }, []);

    const fetchMeta = async () => {
        try {
            const [catsRes, tagsRes] = await Promise.all([
                axios.get("/api/categories?type=article,general"),
                axios.get("/api/tags"),
            ]);
            setCategories(catsRes.data || []);
            setTags(tagsRes.data || []);
        } catch (error) {
            console.error("Failed to fetch categories/tags", error);
        }
    };

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/articles");
            setArticles(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch articles", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (article: Article | null = null) => {
        if (article) {
            setEditingArticle(article);
            setFormData({
                title: article.title,
                excerpt: article.excerpt,
                content: article.content,
                is_published: article.is_published,
                category_id: article.category_id,
                tag_ids: (article.tags || []).map((t) => t.id),
                image: article.image || null,
            });
        } else {
            setEditingArticle(null);
            setFormData({
                title: "",
                excerpt: "",
                content: "",
                is_published: true,
                category_id: null,
                tag_ids: [],
                image: null,
            });
        }
        setIsModalOpen(true);
    };

    const { toast } = useToast();
    const { user } = useAuth();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");

            const payload = {
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                image: formData.image,
                category_id: formData.category_id,
                tags: formData.tag_ids,
                is_published: formData.is_published,
                author_id: user?.id,
            };

            if (editingArticle) {
                await axios.put(`/api/articles/${editingArticle.id}`, payload);
            } else {
                await axios.post("/api/articles", payload);
            }

            await fetchArticles();
            setIsModalOpen(false);
            toast(
                editingArticle
                    ? "Article mis à jour avec succès"
                    : "Article créé avec succès",
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.title?.[0] ||
                err.response?.data?.errors?.category_id?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const handleDelete = async (article: Article) => {
        setPendingDelete(article);
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/articles/${pendingDelete.id}`);
            await fetchArticles();
            toast("Article supprimé");
            setPendingDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const filteredArticles = articles.filter(
        (a) =>
            a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (a.author?.name || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Gestion des Articles
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {articles.length} publications enregistrées
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouvel Article
                </button>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-[0.2em] bg-[#F8FAFC]">
                                <th className="px-8 py-6">Article</th>
                                <th className="px-8 py-6">
                                    Auteur & Catégorie
                                </th>
                                <th className="px-8 py-6">Performance</th>
                                <th className="px-8 py-6">Statut</th>
                                <th className="px-8 py-6 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                            {isLoading
                                ? [1, 2, 3].map((i) => (
                                      <tr key={i} className="animate-pulse">
                                          <td
                                              colSpan={5}
                                              className="px-8 py-10 bg-white/50"
                                          />
                                      </tr>
                                  ))
                                : filteredArticles.map((article) => (
                                      <tr
                                          key={article.id}
                                          className="hover:bg-[#F8FAFC]/50 smooth-animation group"
                                      >
                                          <td className="px-8 py-6">
                                              <div className="flex items-center space-x-5">
                                                  <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] flex items-center justify-center overflow-hidden border border-[#F1F5F9] shrink-0">
                                                      {article.image ? (
                                                          <img
                                                              src={
                                                                  article.image
                                                              }
                                                              alt=""
                                                              className="w-full h-full object-cover"
                                                          />
                                                      ) : (
                                                          <FileText className="w-6 h-6 text-[#9E9E9E]" />
                                                      )}
                                                  </div>
                                                  <div className="min-w-0">
                                                      <p className="font-black text-[#212121] text-sm group-hover:text-[#00B8D4] smooth-animation leading-tight mb-1 truncate">
                                                          {article.title}
                                                      </p>
                                                      <div className="flex items-center text-[10px] font-bold text-[#9E9E9E] uppercase tracking-widest">
                                                          <Calendar className="w-3 h-3 mr-1.5" />
                                                          {new Date(
                                                              article.created_at,
                                                          ).toLocaleDateString()}
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="px-8 py-6">
                                              <div className="space-y-2">
                                                  <div className="flex items-center space-x-2">
                                                      <div className="w-6 h-6 rounded-lg bg-[#00B8D4]/10 text-[#00B8D4] flex items-center justify-center text-[10px] font-black">
                                                          {(
                                                              article.author
                                                                  ?.name || "?"
                                                          ).charAt(0)}
                                                      </div>
                                                      <span className="text-xs font-bold text-[#212121]">
                                                          {article.author
                                                              ?.name ||
                                                              "Inconnu"}
                                                      </span>
                                                  </div>
                                                  <div className="flex items-center text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest">
                                                      <Tag className="w-3 h-3 mr-1.5 text-[#00B8D4]" />
                                                      {article.category?.name ||
                                                          "Non catégorisé"}
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="px-8 py-6">
                                              <div className="flex items-center bg-[#F8FAFC] px-4 py-2 rounded-xl w-fit">
                                                  <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" />
                                                  <span className="text-sm font-black text-[#212121]">
                                                      {article.views}
                                                  </span>
                                                  <span className="text-[10px] font-bold text-[#9E9E9E] ml-2 uppercase tracking-widest">
                                                      vues
                                                  </span>
                                              </div>
                                          </td>
                                          <td className="px-8 py-6">
                                              <span
                                                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                      article.is_published
                                                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                          : "bg-amber-50 text-amber-600 border-amber-100"
                                                  }`}
                                              >
                                                  <div
                                                      className={`w-1.5 h-1.5 rounded-full mr-2 ${article.is_published ? "bg-emerald-500" : "bg-amber-500"}`}
                                                  />
                                                  {article.is_published
                                                      ? "Publié"
                                                      : "Brouillon"}
                                              </span>
                                          </td>
                                          <td className="px-8 py-6 text-right">
                                              <div className="flex items-center justify-end space-x-2">
                                                  <button
                                                      onClick={() =>
                                                          handleOpenModal(
                                                              article,
                                                          )
                                                      }
                                                      className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation"
                                                  >
                                                      <Edit2 className="w-4 h-4" />
                                                  </button>
                                                  <button
                                                      onClick={() =>
                                                          handleDelete(article)
                                                      }
                                                      className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-xl smooth-animation"
                                                  >
                                                      <Trash2 className="w-4 h-4" />
                                                  </button>
                                                  <a
                                                      href={`/blog/${article.slug}`}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-emerald-50 hover:text-emerald-600 rounded-xl smooth-animation"
                                                  >
                                                      <ExternalLink className="w-4 h-4" />
                                                  </a>
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Article Modal */}
            <ModalPortal>
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="fixed inset-0 bg-[#212121]/60 backdrop-blur-md z-[60]"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="fixed inset-0 m-auto w-full max-w-4xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
                            >
                                <div className="p-10 flex items-center justify-between border-b border-[#F1F5F9] shrink-0">
                                    <div>
                                        <h2 className="text-2xl font-black text-[#212121]">
                                            {editingArticle
                                                ? "Modifier l'Article"
                                                : "Nouvel Article Blog"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Partagez votre expertise
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSave}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Titre de l'Article
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="Ex: 10 conseils pour votre chantier"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Layers className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Catégorie
                                            </label>
                                            <select
                                                required
                                                value={formData.category_id ?? ""}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        category_id: e.target
                                                            .value
                                                            ? Number(e.target.value)
                                                            : null,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            >
                                                <option value="" disabled>
                                                    Sélectionner une catégorie
                                                </option>
                                                {categories.map((c) => (
                                                    <option key={c.id} value={c.id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Tag className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Tags
                                            </label>
                                            <div className="bg-[#F8FAFC] rounded-2xl border border-transparent focus-within:ring-4 focus-within:ring-[#00B8D4]/10 p-4 max-h-40 overflow-y-auto custom-scrollbar">
                                                <div className="grid grid-cols-1 gap-3">
                                                    {tags.map((t) => {
                                                        const checked =
                                                            formData.tag_ids.includes(
                                                                t.id,
                                                            );
                                                        return (
                                                            <label
                                                                key={t.id}
                                                                className="flex items-center gap-3 text-xs font-bold text-[#212121] cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        checked
                                                                    }
                                                                    onChange={() => {
                                                                        const next = checked
                                                                            ? formData.tag_ids.filter(
                                                                                  (id) =>
                                                                                      id !==
                                                                                      t.id,
                                                                              )
                                                                            : [
                                                                                  ...formData.tag_ids,
                                                                                  t.id,
                                                                              ];
                                                                        setFormData({
                                                                            ...formData,
                                                                            tag_ids: next,
                                                                        });
                                                                    }}
                                                                    className="h-4 w-4 accent-[#00B8D4]"
                                                                />
                                                                <span className="truncate">
                                                                    {t.name}
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <AlignLeft className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Extrait (Résumé)
                                        </label>
                                        <textarea
                                            rows={2}
                                            required
                                            value={formData.excerpt}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    excerpt: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                            placeholder="Un court résumé pour la liste des articles..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <FileText className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Contenu de l'Article
                                        </label>
                                        <div className="quill-admin-wrapper bg-[#F8FAFC] rounded-2xl overflow-hidden">
                                            <ReactQuill
                                                theme="snow"
                                                value={formData.content}
                                                onChange={(value) =>
                                                    setFormData({
                                                        ...formData,
                                                        content: value,
                                                    })
                                                }
                                                modules={{
                                                    toolbar: [
                                                        [
                                                            {
                                                                header: [
                                                                    1,
                                                                    2,
                                                                    3,
                                                                    false,
                                                                ],
                                                            },
                                                        ],
                                                        [
                                                            "bold",
                                                            "italic",
                                                            "underline",
                                                            "strike",
                                                        ],
                                                        [
                                                            { list: "ordered" },
                                                            { list: "bullet" },
                                                        ],
                                                        [
                                                            "blockquote",
                                                            "code-block",
                                                        ],
                                                        ["link", "image"],
                                                        [{ align: [] }],
                                                        ["clean"],
                                                    ],
                                                }}
                                                placeholder="Rédigez le contenu de votre article..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <ImageIcon className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Image de Couverture
                                            </label>
                                            <ImageUploader
                                                value={formData.image}
                                                onChange={(url) =>
                                                    setFormData({
                                                        ...formData,
                                                        image: url,
                                                    })
                                                }
                                                label="Choisir une image"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-3xl">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className={`w-12 h-6 rounded-full p-1 smooth-animation cursor-pointer ${formData.is_published ? "bg-[#00B8D4]" : "bg-[#E2E8F0]"}`}
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                is_published:
                                                                    !formData.is_published,
                                                            })
                                                        }
                                                    >
                                                        <div
                                                            className={`w-4 h-4 bg-white rounded-full shadow-sm smooth-animation ${formData.is_published ? "translate-x-6" : "translate-x-0"}`}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-black text-[#212121] uppercase tracking-widest">
                                                        Publier immédiatement
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 pt-4 shrink-0">
                                        <button
                                            type="submit"
                                            className="flex-1 flex items-center justify-center py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                                        >
                                            <Save className="w-5 h-5 mr-3" />
                                            Enregistrer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                            className="flex-1 flex items-center justify-center py-5 px-6 bg-white border border-[#E2E8F0] text-[#616161] rounded-[1.5rem] hover:bg-red-50 hover:text-red-500 hover:border-red-100 smooth-animation font-black text-xs uppercase tracking-widest"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </ModalPortal>

            <ConfirmDialog
                open={!!pendingDelete}
                title="Supprimer l'article ?"
                message={
                    pendingDelete
                        ? `Cette action supprimera "${pendingDelete.title}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingDelete(null)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
