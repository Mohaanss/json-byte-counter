"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, FileText, Hash, Braces, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Component() {
  const [jsonInput, setJsonInput] = useState("")
  const [isValidJson, setIsValidJson] = useState(true)
  const [jsonError, setJsonError] = useState("")

  const validateAndAnalyzeJson = useCallback((input: string) => {
    if (!input.trim()) {
      setIsValidJson(true)
      setJsonError("")
      return
    }

    try {
      JSON.parse(input)
      setIsValidJson(true)
      setJsonError("")
    } catch (error) {
      setIsValidJson(false)
      setJsonError(error instanceof Error ? error.message : "JSON invalide")
    }
  }, [])

  const handleInputChange = (value: string) => {
    setJsonInput(value)
    validateAndAnalyzeJson(value)
  }

  const formatJson = () => {
    if (isValidJson && jsonInput.trim()) {
      try {
        const parsed = JSON.parse(jsonInput)
        const formatted = JSON.stringify(parsed, null, 2)
        setJsonInput(formatted)
      } catch (error) {
        // Ignore formatting errors
      }
    }
  }

  const clearInput = () => {
    setJsonInput("")
    setIsValidJson(true)
    setJsonError("")
  }

  // Calculate statistics
  const byteCount = new TextEncoder().encode(jsonInput).length
  const charCount = jsonInput.length
  const lineCount = jsonInput.split("\n").length
  const wordCount = jsonInput.trim() ? jsonInput.trim().split(/\s+/).length : 0

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header with SEO content */}
          <header className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-slate-900">
              Compteur de Bytes JSON - Analyseur de Taille de Payload
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Analysez la taille de vos payloads JSON en temps réel. Outil gratuit pour développeurs avec validation
              JSON, comptage de bytes UTF-8 et statistiques détaillées.
            </p>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* JSON Input */}
            <section className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Braces className="h-5 w-5" />
                    Analyseur de Payload JSON
                  </CardTitle>
                  <CardDescription>
                    Collez votre code JSON ci-dessous pour analyser sa taille en bytes et valider sa syntaxe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder='{"exemple": "Collez votre JSON ici pour analyser sa taille..."}'
                    value={jsonInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className={`min-h-[400px] font-mono text-sm ${
                      !isValidJson ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    aria-label="Zone de saisie JSON"
                  />

                  {/* JSON Validation Status */}
                  {jsonInput.trim() && (
                    <div className="flex items-center gap-2" role="status" aria-live="polite">
                      {isValidJson ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">JSON valide</span>
                        </div>
                      ) : (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">{jsonError}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={formatJson}
                      variant="outline"
                      disabled={!isValidJson || !jsonInput.trim()}
                      aria-label="Formater le JSON"
                    >
                      Formater JSON
                    </Button>
                    <Button
                      onClick={clearInput}
                      variant="outline"
                      disabled={!jsonInput.trim()}
                      aria-label="Effacer le contenu"
                    >
                      Effacer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Statistics Panel */}
            <aside className="space-y-4">
              {/* Byte Count - Main Metric */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Taille en Bytes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600" aria-label={`${byteCount} bytes`}>
                    {byteCount.toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">bytes (UTF-8)</p>
                </CardContent>
              </Card>

              {/* Other Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistiques Détaillées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <span className="text-sm">Caractères</span>
                    </div>
                    <Badge variant="secondary">{charCount.toLocaleString()}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-slate-500" />
                      <span className="text-sm">Lignes</span>
                    </div>
                    <Badge variant="secondary">{lineCount.toLocaleString()}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <span className="text-sm">Mots</span>
                    </div>
                    <Badge variant="secondary">{wordCount.toLocaleString()}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Size Comparisons */}
              {byteCount > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Conversions de Taille</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Kilobytes (KB)</span>
                      <span className="font-mono">{(byteCount / 1024).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Megabytes (MB)</span>
                      <span className="font-mono">{(byteCount / (1024 * 1024)).toFixed(4)}</span>
                    </div>
                    {byteCount > 1000 && (
                      <div className="pt-2 border-t">
                        <div className="text-xs text-slate-600">
                          {byteCount > 1024 * 1024 ? (
                            <span className="text-red-600">⚠️ Payload très volumineux</span>
                          ) : byteCount > 1024 * 100 ? (
                            <span className="text-orange-600">⚠️ Payload volumineux</span>
                          ) : (
                            <span className="text-green-600">✓ Taille optimale</span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>

          {/* SEO Content Section */}
          <section className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />À propos du Compteur de Bytes JSON
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2">Pourquoi analyser la taille JSON ?</h3>
                    <p className="text-slate-600 mb-4">
                      L'analyse de la taille des payloads JSON est cruciale pour l'optimisation des performances web.
                      Des payloads plus petits signifient des temps de chargement plus rapides et une meilleure
                      expérience utilisateur.
                    </p>
                    <h3 className="font-semibold mb-2">Fonctionnalités principales</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Comptage précis en bytes UTF-8</li>
                      <li>• Validation JSON en temps réel</li>
                      <li>• Formatage automatique du code</li>
                      <li>• Statistiques détaillées</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Cas d'usage</h3>
                    <ul className="text-slate-600 space-y-1 mb-4">
                      <li>• Optimisation d'APIs REST</li>
                      <li>• Analyse de réponses GraphQL</li>
                      <li>• Validation de configurations</li>
                      <li>• Audit de performances</li>
                    </ul>
                    <h3 className="font-semibold mb-2">Avantages</h3>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Gratuit et sans inscription</li>
                      <li>• Traitement côté client sécurisé</li>
                      <li>• Interface intuitive</li>
                      <li>• Résultats instantanés</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Compteur de Bytes JSON</h2>
          <p className="text-slate-300 text-sm mb-4">
            Outil gratuit pour développeurs - Analysez et optimisez vos payloads JSON
          </p>
          <div className="text-xs text-slate-400">
            <p>© 2024 JSON Byte Counter. Outil d'analyse JSON gratuit pour développeurs.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
