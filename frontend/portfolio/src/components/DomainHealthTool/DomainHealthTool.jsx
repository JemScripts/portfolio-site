import { useState } from "react";
import DnsRecordsCard from "./DnsRecordsCard.jsx";
import ErrorBanner from "./ErrorBanner.jsx";
import HealthCard from "./HealthCard.jsx";
import SearchBar from "./SearchBar.jsx";
import SkeletonCards from "./SkeletonCards.jsx";
import SpfCard from "./SpfCard.jsx";
import ExplanationBar from "../Explanations/ExplanationBar.jsx";

const API = import.meta.env.VITE_API_BASE_URL;

export default function DomainHealthTool() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckDomain = async () => {
    if (!domain.trim()) return;

    setLoading(true);
    setError(null);

   
    try {
        const response = await fetch(
            `${API}/api/domainhealth?domain=${encodeURIComponent(domain)}`
        );
    
        if (!response. ok) {
            throw new Error("Unable to retrieve domain health data");
        }

        const result = await response.json();

      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-5xl p-8">
            <div className="mx-auto max-w-5xl bg-slate-50 p-8 font-sans">
                <h1 className="text-3xl font-bold text-blue-600">Domain Health Checker</h1>

                <SearchBar
                    domain={domain}
                    setDomain={setDomain}
                    onSearch={handleCheckDomain}
                    loading={loading}
                />

                {error && (
                    <ErrorBanner 
                        message={error}
                        onRetry={handleCheckDomain}
                    />
                )}

                {!data && !loading && !error && (
                    <div style={{
                        background: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                        textAlign: "center"
                    }}>
                        <h2>
                            Check a domain's DNS and email security posture
                        </h2>
                        <p style={{ color: "#6b7280", maxWidth: "600px", margin: "10px auto" }}>
                            Enter a domain above to retrieve A, MX, TXT records, detect SPF configuration and generate a health score.
                        </p>
                    </div>
                )}

                {loading && <SkeletonCards />}

                {!loading && data && (
                    <>
                        <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
                            <h2 className="m-0 text-2xl font-semibold text-slate-900">{data.domain}</h2>
                            <p className="mt-2 text-lg text-slate-700">
                                Score: <b>{data.health.score}</b> - {data.health.status}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                            <HealthCard health = {data.health} />
                            <SpfCard spf = {data.spf} />
                            <DnsRecordsCard dns = {data.dns} />
                        </div>
                    </>
                )}
            </div>

            <ExplanationBar 
            question="What Does This Tool Do?" 
            explanation={
                <>
                <p>
                This tool retrieves the A, MX and TXT records of a domain, detects SPF configuration and uses a basic scoring system to determine whether the domain is healthy or not.
                
                </p>
                <p className="pt-2">
                When or if these are not configured correctly, your website becomes open to a lot of vulnerabilities where it could break, have emails fail to send or let attackers abuse your domain.
                </p>

                <ul className="list-disc pl-5 space-y-2 pt-2">
                    <li className="font-bold">What is an A Record?</li>
                    <p>An A record simply put is an Address Record. What this means is that it maps a domain name to an IPv4 address to let the server know how to reach your site.</p>
                    <p>If it's misconfigured, the website is no longer reachable and could result in misrouted traffic.</p>
                    <li className="font-bold">What is an MX Record?</li>
                    <p>MX Records or Mail Exchange records tell the internet which mail servers should receive email for this domain.</p>
                    <p>If it's misconfigured, your domain will not properly receive mail, which can result in missing important emails, such as password resets or support requests which can be detrimental to a business.</p>
                    <li className="font-bold">What is a TXT Record?</li>
                    <p>TXT Records or text records store text data. These are used for domain verification, email security, anti-spam policies and ownership proof.</p>
                    <li className="font-bold">What is an SPF record?</li>
                    <p>This coincides with the previous point, as SPFs or Sender Policy Frameworks are usually stored as TXT records.</p>
                    <p>It tells the mail servers which systems are allowed to send mail using their domain server.</p>
                    <p>Without proper SPF configuration, attackers can spoof your domain, resulting in your users being attacked and ruin your website's reputation.</p>
                </ul>
                </>}
            />

            <ExplanationBar 
            question="Architecture & Design Decisions" 
            explanation={
                <>
                    <p>This tool was built with ASP.NET for the backend with React as a frontend. When a user inputs a domain, the input gets sent to the backend API which retrieves the data through services like:</p>
                    <ul className="list-disc pl-5 space-y-2 pt-2">
                        <li className="font-bold">DomainHealthService</li>
                        <li className="font-bold">SpfService</li>
                        <li className="font-bold">HealthScoreService</li>
                    </ul>
                    <p>These work with their individual model files to process logic, retrieve and manipulate data such as DNS/SPF data before returning structured results to the controller.
                        The controller receives the request, calls the services and returns the response using asychronous functions, which are used to avoid blocking request threads while awaiting DNS lookups.</p>
                    <ul className="list-disc pl-5 space-y-2 pt-2">
                        <li className="font-bold">Why does the business logic live in services?</li>
                        <p>The business logic is separated to improve maintainability, modularity and extensibility. In other words, having the data processing logic in individual services means that when an issue arises or theres something new to add, it's easily accessible and less cluttered,
                            which also makes it more readable and safer to implement/remove features without breaking other features.
                        </p>
                        <p>This is a concept called Separation of Concerns.</p>
                        <li className="font-bold">Why don't you put the backend logic in the frontend?</li>
                        <p>If this were to happen, the project would be very confusing to read and work off. 
                            The frontend is responsible for presentation and user interaction, while the backend handles data retrieval, business logic and external DNS operations. That's why you typically pair React with a backend technology such as Express, Django or ASP.NET.
                            </p>
                        <li className="font-bold">What about how the frontend handles presentation?</li>
                        <p>Similar to a separation of concerns, react has a component concept. Which means I can take the roots of what would be, for example a tool or a "white card", a searchbar or a button, and reuse it with different variables and varieties
                            all across the website without having to clutter up pages with hundreds of lines of copy & pasted or reused code.
                        </p>
                    </ul>
                </>
                } 
            />

            <ExplanationBar 
            question="Challenges & Debugging" 
            explanation={
            <>
            <p>There were a few challenges that I had to handle during this project.</p>
            <ul className="list-disc pl-5 space-y-2 pt-2">
                <li className="font-bold">CORS Issues</li>
                <p>During deployment I had to deal with Cross-Origin Resource Sharing (CORS), which is a security mechanism that stops data being requested from unauthorised sources.</p>
                <p>This meant that when I was calling to my API, it blocked the request because it didn't recognise my domain name, due to small differences such as not including "www." or "https" in the CORS whitelist.</p>
                <li className="font-bold">Async Serialisation Error</li>
                <p>While building the backend, I returned a Task/async state object instead of awaited data. This resulted in ASP.NET trying to serialise the async state machine into JSON which didn't work.</p>
                <p>I quickly realised my mistake and added an "await" to the return. I learned that controllers should return actual serialisable objects and "await" resolves the asychronous operation and returns the data.</p>
                <li className="font-bold">Nullable Aware Warnings</li>
                <p>Null reference warnings are less severe than run-time issues, but are important for reliability and defensive programming.</p>
                <p>APIs can return missing or null data and models should accurately represent optional data. Null checks help prevent run-time exceptions and prevent trying to load something that isn't there.</p>
            </ul>
            </>
            }
            />

            <ExplanationBar 
            question="Tradeoffs & Limitations" 
            explanation={
            <>
            <p>
                There are a few tradeoffs and limitations that I had to take into consideration when designing this project.
            </p>
            <ul className="list-disc pl-5 space-y-2 pt-2">
                <li className="font-bold">Health Score Complexity</li>
                <p>The way the health score system is calculated is very simple. For example, there is a base score of 100 for a healthy domain. 
                    When the data gets parsed and the service realises there are no A Records for example, it uses a weighted scoring system and removes -20 for example.</p>
                <p>This is a decision I had to make to fit the scope and length of designing this project, while still being useful and an indicator of potential configuration issues.</p>
                <li className="font-bold">DNS Record Variability and SPF Subjectivity</li>
                <p>Not every domain will need mail records or so on, but it can still be a healthy domain for its purpose. Therefore, it can't be applicable to every domain.</p>
                <p>While the tool does give warnings about why not having a certain record is bad, it's up to the user to decide how to interpret the results.</p>
                <li className="font-bold">Caching</li>
                <p>There is currently no caching for this tool. Which means, if you look up a domain, it will go through the process and request the data from the services again, rather than being locally cached and instantly being pulled up.</p>
                <p>This results in more external requests and higher latency, but is again due to the scope of the project.</p>
            </ul>
            </>
            }
            />

            <ExplanationBar 
            question="Technologies Used" 
            explanation={
                <>
                <ul className="list-disc pl-5 space-y-2 pt-2">
                    <li className="font-bold">Frontend</li>
                    <li>React</li>
                    <li>Tailwind</li>
                    <li>Vite</li>
                    <li className="font-bold">Backend</li>
                    <li>ASP.NET</li>
                    <li>DnsClient.NET</li>
                    <li className="font-bold">Deployment</li>
                    <li>Railway</li>
                </ul>
                </>
            }
            />

            <ExplanationBar 
            question="How AI Assisted Development" 
            explanation={
                <>
                <p>It's important to learn how to use AI as an assistant, rather than as a crutch. Previously I have done a lot more work with Java, JavaScript libraries and frameworks and Python compared to C#.</p>
                <p className="pt-2">
                AI was used similarily to documentation or pair-programming assistance during development, I used AI to guide me through some of .NETs syntax and help me make trade offs when designing my project, as well as iterate faster. 
                I used it to learn concepts that I was lacking knowledge on but I understood practically, such as why we separate the models and services, and the concept of separation of services. These concepts were reinforced through independent problem solving and iteration. Implementation, debugging and deployment still required manual reasoning.</p>
                </>
            }
            />
        </div>
    </div>
  );
}