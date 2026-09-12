import { useState, useEffect, useRef } from 'react'
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSpinner,
  FaTimes,
  FaCheck,
  FaCloudUploadAlt,
  FaUserTie,
  FaUsers,
  FaShieldAlt,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa'
import {
  getAdminTeamMembers,
  createAdminTeamMember,
  updateAdminTeamMember,
  deleteAdminTeamMember,
} from '../../services/catalogService'
import { useToast } from '../../context/ToastContext'

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
]

export default function AdminTeam() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // Modal State
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [saving, setSaving] = useState(false)
  const [modalError, setModalError] = useState('')

  // Form State
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState('')
  const [about, setAbout] = useState('')
  const [isExecutive, setIsExecutive] = useState(false)
  const [order, setOrder] = useState(1)
  const [isDragOver, setIsDragOver] = useState(false)

  // Delete Confirm Modal
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fileInputRef = useRef(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    setLoading(true)
    try {
      const data = await getAdminTeamMembers()
      const list = Array.isArray(data) ? data : data.team || []
      setMembers(list.sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99)))
    } catch (error) {
      console.error('Error fetching team members:', error)
      showToast('Failed to load team members', 'error')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingMember(null)
    setName('')
    setRole('')
    setImage(DEFAULT_AVATARS[0])
    setAbout('')
    setIsExecutive(false)
    setOrder(members.length + 1)
    setModalError('')
    setShowModal(true)
  }

  const openEditModal = (member) => {
    setEditingMember(member)
    setName(member.name || '')
    setRole(member.role || '')
    setImage(member.image || DEFAULT_AVATARS[0])
    setAbout(member.about || '')
    setIsExecutive(Boolean(member.isExecutive))
    setOrder(member.order || 1)
    setModalError('')
    setShowModal(true)
  }

  const handleImageFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setModalError('Please upload an image file (PNG, JPG, WEBP, etc.)')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setModalError('Image must be under 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target.result)
      setModalError('')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setModalError('Please enter member name')
      return
    }
    if (!role.trim()) {
      setModalError('Please enter member role/designation')
      return
    }

    setSaving(true)
    setModalError('')

    const payload = {
      name: name.trim(),
      role: role.trim(),
      image: image.trim() || DEFAULT_AVATARS[0],
      about: about.trim(),
      isExecutive,
      order: Number(order) || 1,
    }

    try {
      if (editingMember) {
        await updateAdminTeamMember(editingMember.id, payload)
        showToast('Team member updated successfully', 'success')
      } else {
        await createAdminTeamMember(payload)
        showToast('Team member added successfully', 'success')
      }
      setShowModal(false)
      fetchTeam()
    } catch (error) {
      console.error('Error saving team member:', error)
      setModalError(error.response?.data?.message || 'Failed to save team member')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteConfirmId) return
    setDeleting(true)
    try {
      await deleteAdminTeamMember(deleteConfirmId)
      showToast('Team member removed successfully', 'success')
      setDeleteConfirmId(null)
      fetchTeam()
    } catch (error) {
      console.error('Error deleting team member:', error)
      showToast('Failed to delete team member', 'error')
    } finally {
      setDeleting(false)
    }
  }

  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase()
    return (
      (m.name || '').toLowerCase().includes(q) ||
      (m.role || '').toLowerCase().includes(q) ||
      (m.about || '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaUsers className="text-blue-600 dark:text-blue-400" />
            Team Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage executive leadership and team members shown on the About page.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
        >
          <FaPlus size={14} /> Add Team Member
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-800">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, or bio..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Showing <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredMembers.length}</span> member{filteredMembers.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Team Cards Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <FaSpinner className="animate-spin text-3xl text-blue-600 dark:text-blue-400" />
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center dark:border-slate-700">
          <FaUsers className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">No team members found</p>
          <p className="mt-1 text-sm text-slate-400">Add your leadership and staff details to appear on the public About page.</p>
          <button
            onClick={openAddModal}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <FaPlus size={12} /> Add First Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-slate-800 ${
                member.isExecutive
                  ? 'border-blue-500/40 dark:border-blue-400/30'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {member.isExecutive && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    <FaUserTie size={10} /> Executive
                  </span>
                </div>
              )}

              <div>
                {/* Circular Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="h-16 w-16 overflow-hidden rounded-full p-0.5 ring-2 ring-blue-500/30 bg-slate-100 dark:bg-slate-700 shadow">
                      <img
                        src={member.image || DEFAULT_AVATARS[0]}
                        alt={member.name}
                        className="h-full w-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = DEFAULT_AVATARS[0]
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {member.role}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      Order: #{member.order || 1}
                    </span>
                  </div>
                </div>

                {/* About Bio */}
                <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                  {member.about || 'No bio description provided.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-700/60">
                <button
                  onClick={() => openEditModal(member)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700/60 dark:hover:text-blue-400 transition"
                >
                  <FaEdit size={12} /> Edit
                </button>
                <button
                  onClick={() => setDeleteConfirmId(member.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-900/20 transition"
                >
                  <FaTrash size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-800 sm:p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Provide the team member's circular avatar image, full name, role, and about description.
            </p>

            {modalError && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-300">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Avatar Preview & Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Circular Avatar Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="h-20 w-20 rounded-full p-1 ring-4 ring-blue-500/20 bg-white dark:bg-slate-900 shadow">
                      <img
                        src={image || DEFAULT_AVATARS[0]}
                        alt="Preview"
                        className="h-full w-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = DEFAULT_AVATARS[0]
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleImageFile(e.target.files[0])}
                      accept="image/*"
                      className="hidden"
                    />
                    <div
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragOver(true)
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault()
                        setIsDragOver(false)
                        handleImageFile(e.dataTransfer.files[0])
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer rounded-xl border-2 border-dashed p-3 text-center transition ${
                        isDragOver
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'
                      }`}
                    >
                      <FaCloudUploadAlt className="mx-auto text-lg text-blue-500 mb-1" />
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Click or drag image here
                      </p>
                      <p className="text-[10px] text-slate-400">JPG, PNG, WebP up to 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Direct Image URL input */}
                <div className="mt-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Or paste an image URL directly..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mian Amanat Ali"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Role / Designation & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Role / Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Founder & CEO"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* About / Bio */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  About & Philosophy / Bio
                </label>
                <textarea
                  rows="3"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Share a short bio, vision, or responsibilities..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Is Executive Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isExecutiveCheck"
                  checked={isExecutive}
                  onChange={(e) => setIsExecutive(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isExecutiveCheck" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Featured Executive Profile (Highlight as prominent CEO / Director card)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving && <FaSpinner className="animate-spin" />}
                  {editingMember ? 'Update Member' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Delete Team Member?
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Are you sure you want to remove this team member? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting && <FaSpinner className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
