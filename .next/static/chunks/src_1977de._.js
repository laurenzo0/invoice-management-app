(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_1977de._.js", {

"[project]/src/invoices/useInvoices.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useInvoices": (()=>useInvoices)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$invoices$2f$InvoiceProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/invoices/InvoiceProvider.jsx [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
;
function useInvoices() {
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$invoices$2f$InvoiceProvider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvoiceContext"]);
    if (!ctx) throw new Error('useInvoices must be used inside InvoiceProvider');
    return ctx;
}
_s(useInvoices, "/dMy7t63NXD4eYACoT93CePwGrg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/invoices/invoiceSchema.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "invoiceFormSchema": (()=>invoiceFormSchema),
    "validateInvoiceForm": (()=>validateInvoiceForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_import__("[project]/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
;
const addressSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    street: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Required'),
    city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Required'),
    postCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Required'),
    country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Required')
});
const itemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Required'),
    quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive('Must be > 0'),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().positive('Must be > 0')
});
const invoiceFormSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Required'),
    paymentTerms: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(1).max(365),
    paymentDue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Required'),
    clientName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Client name is required'),
    clientEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().email('Must be a valid email'),
    senderAddress: addressSchema,
    clientAddress: addressSchema,
    items: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(itemSchema).min(1, 'At least one item is required')
});
function validateInvoiceForm(values) {
    const parsed = invoiceFormSchema.safeParse(values);
    if (parsed.success) return {
        ok: true,
        data: parsed.data,
        errors: {}
    };
    const flat = parsed.error.flatten();
    return {
        ok: false,
        data: null,
        errors: flat
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ui/Modal.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Modal": (()=>Modal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
function getFocusable(container) {
    if (!container) return [];
    const nodes = container.querySelectorAll('a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])');
    return [
        ...nodes
    ].filter((el)=>!el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
}
function Modal({ title, children, onClose, actions, initialFocusSelector }) {
    _s();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dialogRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reactId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const ariaTitleId = `modal_${reactId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            const onKeyDown = {
                "Modal.useEffect.onKeyDown": (e)=>{
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        onClose?.();
                        return;
                    }
                    if (e.key !== 'Tab') return;
                    const focusables = getFocusable(dialogRef.current);
                    if (focusables.length === 0) return;
                    const first = focusables[0];
                    const last = focusables[focusables.length - 1];
                    const active = document.activeElement;
                    if (e.shiftKey) {
                        if (active === first || !dialogRef.current.contains(active)) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (active === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                }
            }["Modal.useEffect.onKeyDown"];
            document.addEventListener('keydown', onKeyDown);
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            const t = window.setTimeout({
                "Modal.useEffect.t": ()=>{
                    const root = dialogRef.current;
                    const target = initialFocusSelector ? root?.querySelector(initialFocusSelector) : null;
                    const focusables = getFocusable(root);
                    (target ?? focusables[0] ?? root)?.focus?.();
                }
            }["Modal.useEffect.t"], 0);
            return ({
                "Modal.useEffect": ()=>{
                    window.clearTimeout(t);
                    document.removeEventListener('keydown', onKeyDown);
                    document.body.style.overflow = prevOverflow;
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        initialFocusSelector,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modalOverlay",
        ref: overlayRef,
        role: "presentation",
        onMouseDown: (e)=>{
            if (e.target === overlayRef.current) onClose?.();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal",
            ref: dialogRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": ariaTitleId,
            tabIndex: -1,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modalHeader",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "h2",
                            id: ariaTitleId,
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/ui/Modal.jsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "iconPill",
                            type: "button",
                            onClick: onClose,
                            "aria-label": "Close modal",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/ui/Modal.jsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/ui/Modal.jsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modalBody",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/ui/Modal.jsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                actions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modalActions",
                    children: actions
                }, void 0, false, {
                    fileName: "[project]/src/ui/Modal.jsx",
                    lineNumber: 89,
                    columnNumber: 20
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/src/ui/Modal.jsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/ui/Modal.jsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(Modal, "g3J57NZ22ZCpsCueOg0SfWzwhi0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = Modal;
var _c;
__turbopack_refresh__.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/InvoiceFormPage.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "InvoiceFormPage": (()=>InvoiceFormPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$invoices$2f$useInvoices$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/invoices/useInvoices.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$invoices$2f$invoiceSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/invoices/invoiceSchema.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$Modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/ui/Modal.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
const emptyAddress = {
    street: '',
    city: '',
    postCode: '',
    country: ''
};
function todayIso() {
    return new Date().toISOString().slice(0, 10);
}
function emptyInvoice() {
    return {
        description: '',
        paymentTerms: 30,
        paymentDue: todayIso(),
        clientName: '',
        clientEmail: '',
        senderAddress: {
            ...emptyAddress
        },
        clientAddress: {
            ...emptyAddress
        },
        items: [
            {
                name: '',
                quantity: 1,
                price: 0
            }
        ]
    };
}
function fieldErr(errors, path, fallback) {
    const parts = path.split('.');
    let cur = errors?.fieldErrors;
    for (const p of parts){
        if (!cur) return null;
        cur = cur[p];
    }
    if (Array.isArray(cur) && cur.length) return cur[0];
    return fallback ?? null;
}
function InvoiceFormPage({ mode, invoiceId, onClose, onCreated }) {
    _s();
    const { createInvoice, updateInvoice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$invoices$2f$useInvoices$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInvoices"])();
    const [values, setValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "InvoiceFormPage.useState": ()=>emptyInvoice()
    }["InvoiceFormPage.useState"]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mode === 'edit');
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InvoiceFormPage.useEffect": ()=>{
            let alive = true;
            if (mode !== 'edit') return;
            ({
                "InvoiceFormPage.useEffect": async ()=>{
                    setLoading(true);
                    try {
                        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getInvoice(invoiceId);
                        if (!alive) return;
                        const inv = data.invoice;
                        setValues({
                            description: inv.description,
                            paymentTerms: inv.paymentTerms,
                            paymentDue: inv.paymentDue,
                            clientName: inv.clientName,
                            clientEmail: inv.clientEmail,
                            senderAddress: inv.senderAddress,
                            clientAddress: inv.clientAddress,
                            items: inv.items.map({
                                "InvoiceFormPage.useEffect": (it)=>({
                                        name: it.name,
                                        quantity: it.quantity,
                                        price: it.price
                                    })
                            }["InvoiceFormPage.useEffect"])
                        });
                    } catch (e) {
                        if (alive) setSubmitError(e);
                    } finally{
                        if (alive) setLoading(false);
                    }
                }
            })["InvoiceFormPage.useEffect"]();
            return ({
                "InvoiceFormPage.useEffect": ()=>{
                    alive = false;
                }
            })["InvoiceFormPage.useEffect"];
        }
    }["InvoiceFormPage.useEffect"], [
        invoiceId,
        mode
    ]);
    const title = mode === 'edit' ? `Edit #${invoiceId}` : 'New Invoice';
    const onChange = (path, next)=>{
        setValues((v)=>{
            const copy = structuredClone(v);
            const parts = path.split('.');
            let cur = copy;
            for(let i = 0; i < parts.length - 1; i++)cur = cur[parts[i]];
            cur[parts[parts.length - 1]] = next;
            return copy;
        });
    };
    const total = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InvoiceFormPage.useMemo[total]": ()=>{
            const cents = values.items.reduce({
                "InvoiceFormPage.useMemo[total].cents": (sum, it)=>sum + (Number.isFinite(+it.price) ? Math.round(+it.price * 100) : 0) * (+it.quantity || 0)
            }["InvoiceFormPage.useMemo[total].cents"], 0);
            return (cents / 100).toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD'
            });
        }
    }["InvoiceFormPage.useMemo[total]"], [
        values.items
    ]);
    const submit = async (status)=>{
        setSubmitError(null);
        const v = {
            ...values
        };
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$invoices$2f$invoiceSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateInvoiceForm"])(v);
        if (!result.ok) {
            setErrors(result.errors);
            return;
        }
        setErrors(null);
        setSaving(true);
        try {
            const payload = {
                ...result.data,
                status
            };
            if (mode === 'edit') {
                await updateInvoice(invoiceId, payload);
            } else {
                const created = await createInvoice(payload);
                if (onCreated) onCreated(created.id);
                return;
            }
            onClose?.();
        } catch (e) {
            setSubmitError(e);
            if (e.details) setErrors(e.details);
        } finally{
            setSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ui$2f$Modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        title: title,
        onClose: onClose,
        initialFocusSelector: 'input[name="clientName"]',
        actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "row gap wrap",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "secondaryButton",
                    onClick: onClose,
                    disabled: saving,
                    children: "Discard"
                }, void 0, false, {
                    fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "spacer"
                }, void 0, false, {
                    fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "secondaryButton",
                    onClick: ()=>submit('draft'),
                    disabled: saving || loading,
                    children: "Save as Draft"
                }, void 0, false, {
                    fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "primaryButton",
                    onClick: ()=>submit('pending'),
                    disabled: saving || loading,
                    children: "Save & Send"
                }, void 0, false, {
                    fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                    lineNumber: 138,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/InvoiceFormPage.jsx",
            lineNumber: 130,
            columnNumber: 9
        }, void 0),
        children: [
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: "Loading…"
            }, void 0, false, {
                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                lineNumber: 144,
                columnNumber: 18
            }, this) : null,
            submitError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "formError",
                role: "alert",
                children: submitError.message
            }, void 0, false, {
                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                lineNumber: 146,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "form",
                onSubmit: (e)=>{
                    e.preventDefault();
                    submit('pending');
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "fieldset",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "legend",
                                children: "Bill From"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Street Address",
                                        name: "senderStreet",
                                        value: values.senderAddress.street,
                                        error: fieldErr(errors, 'senderAddress.street'),
                                        onChange: (v)=>onChange('senderAddress.street', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "City",
                                        name: "senderCity",
                                        value: values.senderAddress.city,
                                        error: fieldErr(errors, 'senderAddress.city'),
                                        onChange: (v)=>onChange('senderAddress.city', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Post Code",
                                        name: "senderPostCode",
                                        value: values.senderAddress.postCode,
                                        error: fieldErr(errors, 'senderAddress.postCode'),
                                        onChange: (v)=>onChange('senderAddress.postCode', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Country",
                                        name: "senderCountry",
                                        value: values.senderAddress.country,
                                        error: fieldErr(errors, 'senderAddress.country'),
                                        onChange: (v)=>onChange('senderAddress.country', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "fieldset",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "legend",
                                children: "Bill To"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Client’s Name",
                                        name: "clientName",
                                        value: values.clientName,
                                        error: fieldErr(errors, 'clientName'),
                                        onChange: (v)=>onChange('clientName', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Client’s Email",
                                        name: "clientEmail",
                                        value: values.clientEmail,
                                        error: fieldErr(errors, 'clientEmail'),
                                        onChange: (v)=>onChange('clientEmail', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Street Address",
                                        name: "clientStreet",
                                        value: values.clientAddress.street,
                                        error: fieldErr(errors, 'clientAddress.street'),
                                        onChange: (v)=>onChange('clientAddress.street', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "City",
                                        name: "clientCity",
                                        value: values.clientAddress.city,
                                        error: fieldErr(errors, 'clientAddress.city'),
                                        onChange: (v)=>onChange('clientAddress.city', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Post Code",
                                        name: "clientPostCode",
                                        value: values.clientAddress.postCode,
                                        error: fieldErr(errors, 'clientAddress.postCode'),
                                        onChange: (v)=>onChange('clientAddress.postCode', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Country",
                                        name: "clientCountry",
                                        value: values.clientAddress.country,
                                        error: fieldErr(errors, 'clientAddress.country'),
                                        onChange: (v)=>onChange('clientAddress.country', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "fieldset",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "legend",
                                children: "Invoice"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Invoice Date",
                                        name: "paymentDue",
                                        type: "date",
                                        value: values.paymentDue,
                                        error: fieldErr(errors, 'paymentDue'),
                                        onChange: (v)=>onChange('paymentDue', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Payment Terms (days)",
                                        name: "paymentTerms",
                                        type: "number",
                                        value: values.paymentTerms,
                                        error: fieldErr(errors, 'paymentTerms'),
                                        onChange: (v)=>onChange('paymentTerms', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Project Description",
                                        name: "description",
                                        value: values.description,
                                        error: fieldErr(errors, 'description'),
                                        onChange: (v)=>onChange('description', v)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                        className: "fieldset",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                className: "legend",
                                children: "Item List"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            typeof errors?.formErrors?.[0] === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "formError",
                                role: "alert",
                                children: errors.formErrors[0]
                            }, void 0, false, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "itemsEditor",
                                children: values.items.map((it, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "itemRow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Item Name",
                                                name: `itemName_${idx}`,
                                                value: it.name,
                                                error: errors?.fieldErrors?.items?.[idx]?.name?.[0] ?? null,
                                                onChange: (v)=>{
                                                    setValues((prev)=>{
                                                        const next = structuredClone(prev);
                                                        next.items[idx].name = v;
                                                        return next;
                                                    });
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                                lineNumber: 281,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Qty.",
                                                name: `itemQty_${idx}`,
                                                type: "number",
                                                value: it.quantity,
                                                error: errors?.fieldErrors?.items?.[idx]?.quantity?.[0] ?? null,
                                                onChange: (v)=>{
                                                    setValues((prev)=>{
                                                        const next = structuredClone(prev);
                                                        next.items[idx].quantity = v;
                                                        return next;
                                                    });
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Price",
                                                name: `itemPrice_${idx}`,
                                                type: "number",
                                                value: it.price,
                                                error: errors?.fieldErrors?.items?.[idx]?.price?.[0] ?? null,
                                                onChange: (v)=>{
                                                    setValues((prev)=>{
                                                        const next = structuredClone(prev);
                                                        next.items[idx].price = v;
                                                        return next;
                                                    });
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                                lineNumber: 308,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "label",
                                                        children: "Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                                        lineNumber: 323,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "readonlyBox",
                                                        children: ((+it.quantity || 0) * (Number.isFinite(+it.price) ? +it.price : 0)).toFixed(2)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                                        lineNumber: 324,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "iconPill danger",
                                                "aria-label": "Remove item",
                                                onClick: ()=>{
                                                    setValues((prev)=>{
                                                        const next = structuredClone(prev);
                                                        next.items.splice(idx, 1);
                                                        return next.items.length ? next : {
                                                            ...next,
                                                            items: [
                                                                {
                                                                    name: '',
                                                                    quantity: 1,
                                                                    price: 0
                                                                }
                                                            ]
                                                        };
                                                    });
                                                },
                                                children: "🗑"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                                lineNumber: 328,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "secondaryButton full",
                                onClick: ()=>setValues((prev)=>({
                                            ...prev,
                                            items: [
                                                ...prev.items,
                                                {
                                                    name: '',
                                                    quantity: 1,
                                                    price: 0
                                                }
                                            ]
                                        })),
                                children: "+ Add New Item"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "formTotal subtle",
                                children: [
                                    "Current total: ",
                                    total
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s(InvoiceFormPage, "HRh0++UctlvJn9jb6d4Yp3dA8nc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$invoices$2f$useInvoices$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInvoices"]
    ];
});
_c = InvoiceFormPage;
function Field({ label, name, value, onChange, error, type = 'text' }) {
    const id = `f_${name}`;
    const hasError = Boolean(error);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `field ${hasError ? 'hasError' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "label",
                htmlFor: id,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                lineNumber: 366,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: id,
                name: name,
                className: "input",
                type: type,
                value: value ?? '',
                onChange: (e)=>onChange(type === 'number' ? e.target.value : e.target.value),
                "aria-invalid": hasError ? 'true' : 'false',
                "aria-describedby": hasError ? `${id}_err` : undefined
            }, void 0, false, {
                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                lineNumber: 369,
                columnNumber: 7
            }, this),
            hasError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fieldError",
                id: `${id}_err`,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/pages/InvoiceFormPage.jsx",
                lineNumber: 380,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/InvoiceFormPage.jsx",
        lineNumber: 365,
        columnNumber: 5
    }, this);
}
_c1 = Field;
var _c, _c1;
__turbopack_refresh__.register(_c, "InvoiceFormPage");
__turbopack_refresh__.register(_c1, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/invoice/new/page.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Page)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$InvoiceFormPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/pages/InvoiceFormPage.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
function Page() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$InvoiceFormPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvoiceFormPage"], {
        mode: "new",
        onClose: ()=>router.push('/'),
        onCreated: (id)=>router.push(`/invoice/${id}`)
    }, void 0, false, {
        fileName: "[project]/src/app/invoice/new/page.jsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(Page, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Page;
var _c;
__turbopack_refresh__.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/invoice/new/page.jsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_1977de._.js.map